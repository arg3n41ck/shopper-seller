from django.contrib import admin

from apps.shops.models import Shop, ShopKey


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    pass


@admin.register(ShopKey)
class ShopKeyAdmin(admin.ModelAdmin):
    pass
