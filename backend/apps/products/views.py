from rest_framework import viewsets
from rest_framework.filters import SearchFilter
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
from apps.customers.permissions import IsCustomer
from apps.sellers.permissions import IsSeller


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    pagination_class = None
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Category.objects.all()
            if self.kwargs.get(self.lookup_field)
            else Category.objects.root_nodes()
        )


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
    permission_classes = [IsSeller]
    filter_backends = [SearchFilter]
    filterset_class = ProductFilter
    search_fields = ["sku", "title"]
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
    permission_classes = [IsSeller]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "create":
            return ProductVariantCreateSerializer
        return self.serializer_class


class ProductVariantImageSellerViewSet(viewsets.ModelViewSet):
    queryset = ProductVariantImage.objects.all()
    serializer_class = ProductVariantImageSerializer
    permission_classes = [IsSeller]
    parser_classes = [MultiPartParser]


class ProductFavouriteCustomerViewSet(viewsets.ModelViewSet):
    queryset = ProductFavourite.objects.all()
    serializer_class = ProductFavouriteSerializer
    permission_classes = [IsCustomer]


class ProductReviewCustomerViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [IsCustomer]
