from rest_framework import viewsets

from apps.sellers.permissions import IsSeller
from apps.sellers.models import Shop, ShopBranch
from apps.sellers.serializers import (
    ShopSerializer,
    ShopUpdateSerializer,
    ShopBranchSerializer,
    ShopBranchCreateSerializer,
)
from shared.mixins import DynamicSerializerMixin


class SellerShopViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    serializer_classes = {
        "partial_update": ShopUpdateSerializer,
    }
    permission_classes = [IsSeller]
    http_method_names = ["get", "put", "patch"]
    filterset_fields = ["seller"]
    lookup_field = "slug"


class SellerShopBranchViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = ShopBranch.objects.all()
    serializer_class = ShopBranchSerializer
    permission_classes = [IsSeller]
    serializer_classes = {
        "create": ShopBranchCreateSerializer,
    }


class CustomerShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    lookup_field = "slug"
