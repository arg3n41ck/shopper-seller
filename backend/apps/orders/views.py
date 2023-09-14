from django.db import transaction
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

from apps.accounts.permissions import IsSeller
from apps.orders.models import Order
from apps.orders.serializers import (
    OrderSerializer,
    OrderCreateSerializer,
)

from apps.orders.services import OrderSellerService


class OrderCustomerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "updated_at"]
    filterset_fields = ["customer"]


class OrderSellerViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]
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