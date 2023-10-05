from rest_framework import serializers

from apps.orders.models import Order, OrderItem
from apps.customers.serializers import AnonymousOrCustomerDefault


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product",
            "variant",
            "order",
            "price",
            "quantity",
        )


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = (
            "product",
            "variant",
            "order",
            "price",
            "quantity",
        )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "order_id",
            "customer",
            "address",
            "city",
            "region",
            "phone_number",
            "payment_type",
            "created_at",
            "updated_at",
            "total",
        )


class OrderCreateSerializer(serializers.ModelSerializer):
    customer = serializers.HiddenField(default=AnonymousOrCustomerDefault())
    items = OrderItemCreateSerializer(many=True, required=True)

    class Meta:
        model = Order
        fields = (
            "customer",
            "address",
            "city",
            "region",
            "phone_number",
            "payment_type",
            "items",
        )