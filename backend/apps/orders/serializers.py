from rest_framework import serializers

from apps.orders.models import Cart, CartItem, Order, OrderItem
from apps.products.serializers import ProductVariantSerializer
from apps.customers.serializers import AnonymousOrCustomerDefault


class CartDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.customer.cart

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = (
            "id",
            "cart",
            "product_variant",
            "size",
            "quantity",
            "total",
        )


class CartItemCreateSerializer(serializers.ModelSerializer):
    cart = serializers.HiddenField(default=CartDefault())

    class Meta:
        model = CartItem
        fields = (
            "cart",
            "product_variant",
            "size",
            "quantity",
        )


class CartItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = (
            "quantity"
        )


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = (
            "id",
            "customer",
            "items",
            "total",
        )


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