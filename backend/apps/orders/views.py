from django.db import transaction
from rest_framework import viewsets, filters

from apps.orders.models import Cart, CartItem, Order
from apps.orders.serializers import (
    OrderSerializer,
    OrderCreateSerializer,
    CartSerializer,
    CartItemSerializer,
    CartItemCreateSerializer,
    CartItemUpdateSerializer,
)
from apps.orders.services.order_service import OrderCustomerService
from apps.sellers.permissions import SellerPermission, SellerObjectPermission
from apps.customers.permissions import IsCustomer
from shared.mixins import DynamicSerializerMixin


class CartViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cart.objects.all().prefetch_related("items")
    serializer_class = CartSerializer
    permission_classes = [IsCustomer]
    filterset_fields = ["customer"]


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsCustomer]

    def get_serializer_class(self):
        if self.action == "create":
            return CartItemCreateSerializer
        elif self.action == "partial_update":
            return CartItemUpdateSerializer
        return self.serializer_class


class CustomerOrderViewSet(DynamicSerializerMixin, viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsCustomer]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "updated_at"]
    filterset_fields = ["customer"]
    service = OrderCustomerService()
    serializer_classes = {
        "create": OrderCreateSerializer,
    }

    @transaction.atomic()
    def perform_create(self, serializer):
        items = serializer.validated_data.pop("items")
        instance = serializer.save()
        self.service.process_creation(
            order=instance,
            items_data=items,
        )


class SellerOrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (
        SellerPermission,
        SellerObjectPermission,
    )
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ("created_at",)



