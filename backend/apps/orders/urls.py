from rest_framework.routers import DefaultRouter

from apps.orders.views import (
    CartViewSet,
    CartItemViewSet,
    CustomerOrderViewSet,
    SellerOrderViewSet
)

router = DefaultRouter()
router.register("customer/carts", CartViewSet, basename="carts")
router.register("customer/cart_items", CartItemViewSet, basename="cart_items")
router.register("customer/orders", CustomerOrderViewSet, basename="customer_orders")
router.register("seller/orders", SellerOrderViewSet, basename="seller_orders")

urlpatterns = []

urlpatterns += router.urls
