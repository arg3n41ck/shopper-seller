from rest_framework import viewsets

from apps.customers.models import Customer, Cart, CartItem
from apps.customers.permissions import IsCustomer
from apps.customers.serializers import (
    CustomerSerializer,
    CartSerializer,
    CartItemSerializer,
    CartItemCreateSerializer,
    CartItemUpdateSerializer,
)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsCustomer]
    filterset_fields = ["user"]


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
