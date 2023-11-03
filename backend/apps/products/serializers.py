from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from apps.products.models import (
    Category,
    Tag,
    Product,
    ProductVariant,
    ProductVariantImage,
    Specification,
    ProductFavourite,
    ProductReview,
)
from apps.sellers.serializers import ShopDefault, ShopSerializer
from apps.customers.serializers import CustomerDefault, CustomerSerializer


class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "slug",
            "title",
            "image",
            "parent",
            "children",
        )


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            "id",
            "slug",
            "title",
        )


class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = (
            "id",
            "slug",
            "title",
        )


class ProductVariantImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariantImage
        fields = (
            "id",
            "variant",
            "image",
        )


class ProductVariantImageCreateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = ProductVariantImage
        fields = (
            "image",
        )


class SizeVariantSerializer(serializers.Serializer):
    size = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)


class ProductVariantSerializer(serializers.ModelSerializer):
    images = ProductVariantImageSerializer(many=True, read_only=True)
    size_variants = SizeVariantSerializer(many=True)

    class Meta:
        model = ProductVariant
        fields = (
            "id",
            "slug",
            "product",
            "title",
            "description",
            "size_variants",
            "price_min",
            "price_max",
            "images",
            "image_main",
        )


class ProductVariantCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = (
            "id",
            "product",
            "title",
            "description",
            "size_variants",
        )


class ProductFavouriteSerializer(serializers.ModelSerializer):
    customer = serializers.HiddenField(default=CustomerDefault())

    class Meta:
        model = ProductFavourite
        fields = (
            "id",
            "product",
            "customer",
        )


class ProductReviewSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = ProductReview
        fields = (
            "id",
            "product",
            "star",
            "review",
            "customer",
        )


class ProductReviewCreateSerializer(serializers.ModelSerializer):
    customer = serializers.HiddenField(default=CustomerDefault())

    class Meta:
        model = ProductReview
        fields = (
            "id",
            "product",
            "star",
            "review",
            "customer",
        )


class ProductSpecificationSerializer(serializers.Serializer):
    title = serializers.CharField()
    value = serializers.CharField()


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    shop = ShopSerializer(read_only=True)
    specifications = ProductSpecificationSerializer(many=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "slug",
            "sku",
            "title",
            "description",
            "recommendation",
            "gender",
            "for_kids",
            "price_from",
            "discount",
            "discounted_price",
            "category",
            "country",
            "tags",
            "specifications",
            "shop",
            "publish_date",
            "status",
            "created_at",
            "updated_at",
            "variants",
            "reviews",
            "rating",
        )


class ProductCreateSerializer(serializers.ModelSerializer):
    shop = serializers.HiddenField(default=ShopDefault())

    class Meta:
        model = Product
        fields = (
            "id",
            "slug",
            "sku",
            "title",
            "description",
            "recommendation",
            "gender",
            "for_kids",
            "price_from",
            "discount",
            "category",
            "country",
            "tags",
            "specifications",
            "shop",
            "publish_date",
        )


class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "title",
            "description",
            "recommendation",
            "gender",
            "for_kids",
            "price_from",
            "discount",
            "category",
            "country",
            "tags",
            "specifications",
        )
