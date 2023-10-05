from rest_framework import serializers

from apps.customers.models import Customer, Cart, CartItem
from apps.products.serializers import ProductVariantSerializer


class CustomerDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.customer

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class AnonymousOrCustomerDefault:
    requires_context = True

    def __call__(self, serializer_field):
        request = serializer_field.context.get('request')

        if request and request.user.is_authenticated:
            return request.user.customer
        return None

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class CartDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.customer.cart

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "user",
            "date_of_birth",
            "preferences",
        )


class CustomerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "date_of_birth",
            "preferences",
        )


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
