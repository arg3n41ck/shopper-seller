from django.contrib import admin

from apps.orders.models import Cart, CartItem, Order, OrderItem


class CartItemTabularInline(admin.TabularInline):
    model = CartItem
    can_delete = False


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemTabularInline]


class OrderItemTabularInline(admin.TabularInline):
    model = OrderItem
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemTabularInline]
