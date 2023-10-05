from rest_framework import serializers

from apps.sellers.models import Seller, SellerKey, Shop, ShopBranch
from apps.sellers.services import ShopService
from apps.sellers.constants import SellerErrorMessage


class ShopDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user.seller.shop

    def __repr__(self):
        return f'{self.__class__.__name__}()'


class SellerCreateSerializer(serializers.Serializer):
    key = serializers.CharField(required=True)

    default_error_messages = {
        "key_not_valid": SellerErrorMessage.KEY_NOT_VALID,
    }

    def validate(self, attrs):
        if not SellerKey.objects.filter(key=attrs["key"]).exists():
            self.fail("key_not_valid")
        return attrs


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
            "user",
            "status",
            "site_link",
            "instagram_link",
            "whats_app_link",
            "branches",
        )


class ShopCreateSerializer(serializers.ModelSerializer):
    key = serializers.CharField(required=True)

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

