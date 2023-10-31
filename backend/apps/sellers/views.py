from rest_framework import viewsets, mixins

from apps.sellers.permissions import SellerPermission, SellerObjectPermission, ShopObjectPermission
from apps.sellers.models import Shop, ShopBranch
from apps.sellers.serializers import (
    ShopSerializer,
    ShopUpdateSerializer,
    ShopBranchSerializer,
    ShopBranchCreateSerializer,
)
from shared.mixins import DynamicSerializerMixin


class SellerShopViewSet(DynamicSerializerMixin, mixins.ListModelMixin,
                        mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = (
        SellerPermission,
        SellerObjectPermission,
    )
    filterset_fields = ("seller",)
    lookup_field = "slug"
    serializer_classes = {
        "partial_update": ShopUpdateSerializer,
    }

    def get_queryset(self):
        return super().get_queryset()\
            .filter(seller=self.request.user.seller)\
            .prefetch_related("branches")


class SellerShopBranchViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = ShopBranch.objects.all()
    serializer_class = ShopBranchSerializer
    permission_classes = (
        SellerPermission,
        ShopObjectPermission,
    )
    serializer_classes = {
        "create": ShopBranchCreateSerializer,
    }


class CustomerShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    lookup_field = "slug"
