from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.sellers.permissions import IsSeller
from apps.sellers.models import Shop, ShopBranch
from apps.sellers.serializers import (
    ShopSerializer,
    ShopUpdateSerializer,
    ShopBranchSerializer,
    ShopBranchCreateSerializer,
)


class ShopCustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    lookup_field = "slug"


class ShopSellerViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    permission_classes = [IsSeller]
    http_method_names = ["get", "put", "patch"]
    filterset_fields = ["user"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "partial_update":
            return ShopUpdateSerializer
        return self.serializer_class


class BranchAddressViewSet(viewsets.ModelViewSet):
    queryset = ShopBranch.objects.all()
    serializer_class = ShopBranchSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    http_method_names = ["post", "put", "patch", "delete"]

    def get_serializer_class(self):
        if self.action == "create":
            return ShopBranchCreateSerializer
        return self.serializer_class
