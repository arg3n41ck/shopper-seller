from rest_framework import serializers

from apps.customers.models import Customer


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
        else:
            return None

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
