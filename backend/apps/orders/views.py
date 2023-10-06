from django.db import transaction
from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny

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
from apps.sellers.permissions import IsSeller
from apps.customers.permissions import IsCustomer


class OrderViewSetMixin:
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


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


class OrderCustomerViewSet(OrderViewSetMixin, viewsets.ModelViewSet):
    permission_classes = [IsCustomer]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "updated_at"]
    filterset_fields = ["customer"]
    service = OrderCustomerService()
    
    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create":
            return OrderCreateSerializer
        return self.serializer_class

    @transaction.atomic()
    def perform_create(self, serializer):
        items = serializer.validated_data.pop("items")
        instance = serializer.save()
        self.service.process_creation(
            order=instance,
            items_data=items,
        )


class OrderSellerViewSet(OrderViewSetMixin, viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsSeller]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]



