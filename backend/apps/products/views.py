from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, filters
from rest_framework.filters import SearchFilter
from rest_framework.parsers import MultiPartParser

from apps.products.models import (
    Category,
    Tag,
    Specification,
    Product,
    ProductVariant,
    ProductVariantImage,
    ProductFavourite,
    ProductReview,
)
from apps.products.serializers import (
    CategorySerializer,
    TagSerializer,
    SpecificationSerializer,
    ProductSerializer,
    ProductCreateSerializer,
    ProductUpdateSerializer,
    ProductVariantSerializer,
    ProductVariantCreateSerializer,
    ProductVariantImageSerializer,
    ProductFavouriteSerializer,
    ProductReviewSerializer,
)
from apps.products.filters import SellerProductFilter
from apps.sellers.permissions import SellerPermission, ShopObjectPermission
from apps.customers.permissions import IsCustomer
from shared.mixins import DynamicSerializerMixin


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


class TagViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                 viewsets.GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (SearchFilter,)
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"


class SpecificationViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    filter_backends = (SearchFilter,)
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"


class SellerProductViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = SellerProductFilter
    search_fields = (
        "sku",
        "title",
    )
    permission_classes = (
        SellerPermission,
        ShopObjectPermission,
    )
    lookup_field = "slug"
    serializer_classes = {
        "create": ProductCreateSerializer,
        "partial_update": ProductUpdateSerializer,
    }

    def get_queryset(self):
        """
        DB query optimization
        """
        return super().get_queryset()\
            .filter(shop=self.request.user.seller.shop)\
            .select_related("category",
                            "shop")\
            .prefetch_related("variants",
                              "reviews",
                              "tags")


class SellerProductVariantViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all().prefetch_related("images")
    serializer_class = ProductVariantSerializer
    serializer_classes = {
        "create": ProductVariantCreateSerializer,
    }
    permission_classes = (SellerPermission,)
    lookup_field = "slug"


class SellerProductVariantImageViewSet(viewsets.ModelViewSet):
    queryset = ProductVariantImage.objects.all()
    serializer_class = ProductVariantImageSerializer
    permission_classes = (SellerPermission,)
    parser_classes = (MultiPartParser,)


class CustomerProductViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return super().get_queryset()\
            .select_related("shop")\
            .prefetch_related("variants",
                              "reviews")


class CustomerProductFavouriteViewSet(mixins.ListModelMixin, mixins.CreateModelMixin,
                                      viewsets.GenericViewSet):
    queryset = ProductFavourite.objects.all()
    serializer_class = ProductFavouriteSerializer
    permission_classes = [IsCustomer]


class CustomerProductReviewViewSet(mixins.ListModelMixin, mixins.CreateModelMixin,
                                   viewsets.GenericViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [IsCustomer]
