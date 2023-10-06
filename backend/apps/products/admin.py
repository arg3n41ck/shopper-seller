from django.contrib import admin

from mptt.admin import DraggableMPTTAdmin

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
class CategoryAdmin(DraggableMPTTAdmin):
    list_display = ["tree_actions", "indented_title"]
    list_display_links = ["indented_title"]
    list_filter = ["parent"]
    search_fields = ["title", "description"]
    readonly_fields = ["slug"]


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
