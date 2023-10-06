from django.contrib import admin

from apps.orders.models import Order, OrderItem, Cart, CartItem


class OrderItemTabularInline(admin.TabularInline):
    model = OrderItem
    can_delete = False


class CartItemTabularInline(admin.TabularInline):
    model = CartItem
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemTabularInline]


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemTabularInline]
