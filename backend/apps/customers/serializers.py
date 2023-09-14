from rest_framework import serializers

from apps.customers.models import Customer, CustomerCartItem
from apps.products.serializers import ProductSerializer, ProductVariantSerializer


class CustomerCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CustomerCartItem
        fields = (
            "id",
            "product",
            "variant",
            "quantity",
            "total",
        )


class CustomerSerializer(serializers.ModelSerializer):
    cart_items = CustomerCartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = (
            "id",
            "user",
            "date_of_birth",
            "preferences",
            "cart_items"
        )


class CustomerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "date_of_birth",
            "preferences",
        )
