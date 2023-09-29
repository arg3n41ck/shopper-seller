from django.db import transaction
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from django_filters.rest_framework import DjangoFilterBackend


from apps.products.services import ProductSellerService

from apps.products.models import (
    Category,
    Tag,
    Product,
    ProductVariant,
    ProductVariantImage,
    Specification,
    ProductFavourite,
    ProductReview,
)
from apps.products.serializers import (
    CategorySerializer,
    TagSerializer,
    ProductSerializer,
    ProductVariantSerializer,
    ProductVariantImageSerializer,
    ProductCreateSerializer,
    ProductVariantCreateSerializer,
    SpecificationSerializer,
    ProductFavouriteSerializer,
    ProductReviewSerializer,
)
from apps.products.filters import ProductFilter
from apps.accounts.permissions import IsSeller, IsCustomer
from apps.products.services import ProductVariantSellerService


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.root_nodes()
    serializer_class = CategorySerializer
    pagination_class = None
    lookup_field = "slug"


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"


class SpecificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"


class ProductCustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()\
        .prefetch_related("variants", "reviews")
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProductFilter
    lookup_field = "slug"


class ProductSellerViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()\
        .prefetch_related("variants", "reviews")
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    filterset_class = ProductFilter
    lookup_field = "slug"
    service = ProductSellerService()

    def get_serializer_class(self):
        if self.action == "create":
            return ProductCreateSerializer
        return self.serializer_class


class ProductVariantSellerViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()\
        .prefetch_related("images")
    serializer_class = ProductVariantSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    lookup_field = "slug"
    service = ProductVariantSellerService()

    def get_serializer_class(self):
        if self.action == "create":
            return ProductVariantCreateSerializer
        return self.serializer_class

    @transaction.atomic()
    def perform_create(self, serializer):
        images_data = serializer.validated_data.pop("images")
        instance = serializer.save()
        self.service.process_creation(images_data=images_data, variant=instance)


class ProductVariantImageSellerViewSet(viewsets.ModelViewSet):
    queryset = ProductVariantImage.objects.all()
    serializer_class = ProductVariantImageSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    parser_classes = [MultiPartParser]


class ProductFavouriteViewSet(viewsets.ModelViewSet):
    queryset = ProductFavourite.objects.all()
    serializer_class = ProductFavouriteSerializer
    permission_classes = [IsAuthenticated, IsCustomer]


class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [IsAuthenticated, IsCustomer]
