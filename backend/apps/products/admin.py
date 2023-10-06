from django.contrib import admin

from apps.products.models import (
    Category,
    Tag,
    Product,
    ProductVariant,
    ProductVariantImage,
    ProductFavourite,
    ProductReview,
)


class ProductVariantImageTabularInline(admin.TabularInline):
    model = ProductVariantImage


class ProductVariantTabularInline(admin.TabularInline):
    model = ProductVariant


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantTabularInline]


@admin.register(ProductFavourite)
class ProductFavouriteAdmin(admin.ModelAdmin):
    pass


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    pass
