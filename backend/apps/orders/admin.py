from django.contrib import admin

from apps.orders.models import Order, OrderItem


class OrderItemTabularInline(admin.TabularInline):
    model = OrderItem
    can_delete = False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemTabularInline]
