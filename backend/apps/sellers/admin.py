from django.contrib import admin

from apps.sellers.models import Seller, SellerKey, Shop, ShopBranch


class ShopBranchTabularInline(admin.TabularInline):
    model = ShopBranch
    can_delete = False


@admin.register(SellerKey)
class SellerKeyAdmin(admin.ModelAdmin):
    pass


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    pass


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    inlines = [ShopBranchTabularInline]
