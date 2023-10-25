from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser

from apps.sellers.permissions import IsSeller
from apps.sellers.models import Shop, ShopBranch
from apps.sellers.serializers import (
    ShopSerializer,
    ShopUpdateSerializer,
    ShopBranchSerializer,
    ShopBranchCreateSerializer,
)
from apps.products.models import (
    Product,
    ProductVariant,
    ProductVariantImage,
)
from apps.products.serializers import (
    ProductSerializer,
    ProductCreateSerializer,
    ProductVariantSerializer,
    ProductVariantCreateSerializer,
    ProductVariantImageSerializer,
)
from shared.mixins import DynamicSerializerMixin


class ShopViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    permission_classes = [IsSeller]
    http_method_names = ["get", "put", "patch"]
    filterset_fields = ["seller"]
    lookup_field = "slug"
    serializer_classes = {
        "partial_update": ShopUpdateSerializer
    }


class ShopBranchViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = ShopBranch.objects.all()
    serializer_class = ShopBranchSerializer
    permission_classes = [IsSeller]
    serializer_classes = {
        "create": ShopBranchCreateSerializer,
    }


class ProductViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related("variants", "reviews")
    serializer_class = ProductSerializer
    permission_classes = [IsSeller]
    lookup_field = "slug"
    serializer_classes = {
        "create": ProductCreateSerializer,
    }


class ProductVariantViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all().prefetch_related("images")
    serializer_class = ProductVariantSerializer
    permission_classes = [IsSeller]
    lookup_field = "slug"
    serializer_classes = {
        "create": ProductVariantCreateSerializer,
    }


class ProductVariantImageViewSet(viewsets.ModelViewSet):
    queryset = ProductVariantImage.objects.all()
    serializer_class = ProductVariantImageSerializer
    permission_classes = [IsSeller]
    parser_classes = [MultiPartParser]
