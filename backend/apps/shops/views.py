from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsSeller
from apps.shops.models import Shop, BranchAddress
from apps.shops.serializers import (
    ShopSerializer,
    ShopUpdateSerializer,
    BranchAddressSerializer,
    BranchAddressCreateSerializer,
)


class ShopCustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    lookup_field = "slug"


class ShopSellerViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    http_method_names = ["get", "put", "patch"]
    filterset_fields = ["user"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "partial_update":
            return ShopUpdateSerializer
        return self.serializer_class


class BranchAddressViewSet(viewsets.ModelViewSet):
    queryset = BranchAddress.objects.all()
    serializer_class = BranchAddressSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    http_method_names = ["post", "put", "patch", "delete"]

    def get_serializer_class(self):
        if self.action == "create":
            return BranchAddressCreateSerializer
        return self.serializer_class
