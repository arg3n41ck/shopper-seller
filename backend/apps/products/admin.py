from django.contrib import admin

from apps.products.models import (
    Category,
    Tag,
    Brand,
    Product,
    ProductVariant,
    ProductVariantImage,
    ProductFavourite,
)


class ProductImageInline(admin.TabularInline):
    model = ProductVariantImage


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantInline]


@admin.register(ProductFavourite)
class ProductFavouriteAdmin(admin.ModelAdmin):
    pass
