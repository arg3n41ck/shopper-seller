from django.db import transaction
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsSeller, IsCustomer
from apps.orders.models import Order, Cart, CartItem
from apps.orders.serializers import (
    OrderSerializer,
    OrderCreateSerializer,
    CartSerializer,
    CartItemSerializer,
    CartItemCreateSerializer,
    CartItemUpdateSerializer,
)

from apps.orders.services import OrderSellerService


class CartViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cart.objects.all().prefetch_related("items")
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, IsCustomer]
    filterset_fields = ["customer"]


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated, IsCustomer]

    def get_serializer_class(self):
        if self.action == "create":
            return CartItemCreateSerializer
        elif self.action == "partial_update":
            return CartItemUpdateSerializer
        return self.serializer_class


class OrderCustomerViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "updated_at"]
    filterset_fields = ["customer"]
    service = OrderSellerService()

    def get_serializer_class(self):
        if self.action == "create":
            return OrderCreateSerializer
        return self.serializer_class

    @transaction.atomic()
    def perform_create(self, serializer):
        items = serializer.validated_data.pop("items")

        instance = serializer.save()

        self.service.create_order_items(
            order=instance,
            items_data=items,
        )


class OrderSellerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]



