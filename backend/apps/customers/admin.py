from django.contrib import admin

from apps.customers.models import Customer, Cart, CartItem


class CartItemTabularInline(admin.TabularInline):
    model = CartItem
    can_delete = False


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemTabularInline]


