from rest_framework import serializers

from apps.sellers.models import SellerKey, Shop, ShopBranch
from apps.sellers.constants import SellerErrorMessage


class ShopDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.seller.shop

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class SellerKeySerializer(serializers.ModelSerializer):
    default_error_messages = {
        "key_not_valid": SellerErrorMessage.KEY_NOT_VALID,
    }

    class Meta:
        model = SellerKey
        fields = (
            "key",
        )

    def validate_key(self, value):
        if not SellerKey.objects.filter(key=value, is_active=False).exists():
            self.fail("key_not_valid")
        return value


class ShopBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopBranch
        fields = (
            "id",
            "address",
            "phone_number",
        )


class ShopSerializer(serializers.ModelSerializer):
    branches = ShopBranchSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = (
            "id",
            "slug",
            "logo",
            "title",
            "description",
            "seller",
            "status",
            "site_link",
            "instagram_link",
            "whats_app_link",
            "branches",
        )


class ShopCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = (
            "title",
        )


class ShopUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = (
            "title",
            "description",
            "logo",
            "site_link",
            "instagram_link",
            "whats_app_link",
        )


class ShopBranchCreateSerializer(serializers.ModelSerializer):
    shop = serializers.HiddenField(default=ShopDefault())

    class Meta:
        model = ShopBranch
        fields = (
            "id",
            "address",
            "phone_number",
            "shop",
        )

