from rest_framework import serializers

from apps.shops.models import Shop, BranchAddress
from apps.shops.services import ShopService
from apps.shops.constants import ShopErrorMessage


class ShopDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.shop

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class BranchAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchAddress
        fields = (
            "id",
            "address",
            "phone_number",
        )


class ShopSerializer(serializers.ModelSerializer):
    branches = BranchAddressSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = (
            "id",
            "slug",
            "logo",
            "title",
            "user",
            "status",
            "site_link",
            "instagram_link",
            "whats_app_link",
            "branches",
        )


class ShopCreateSerializer(serializers.ModelSerializer):
    key = serializers.CharField(required=True)

    default_error_messages = {
        "key_not_valid": ShopErrorMessage.KEY_NOT_VALID,
    }

    class Meta:
        model = Shop
        fields = (
            "title",
            "key",
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.shop_service = ShopService()

    def validate_key(self, value):
        if not self.shop_service.shop_key_exists(value):
            self.fail("key_not_valid")
        return value


class ShopUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = (
            "title",
            "logo",
            "site_link",
            "instagram_link",
            "whats_app_link",
        )


class BranchAddressCreateSerializer(serializers.ModelSerializer):
    shop = serializers.HiddenField(default=ShopDefault())

    class Meta:
        model = BranchAddress
        fields = (
            "id",
            "address",
            "phone_number",
            "shop",
        )

