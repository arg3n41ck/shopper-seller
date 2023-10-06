from rest_framework.routers import DefaultRouter

from apps.orders.views import (
    CartViewSet,
    CartItemViewSet,
    OrderCustomerViewSet,
    OrderSellerViewSet
)

router = DefaultRouter()
router.register("customer/orders", OrderCustomerViewSet, basename="customer_orders")
router.register("seller/orders", OrderSellerViewSet, basename="seller_orders")
router.register("customer/carts", CartViewSet, basename="carts")
router.register("customer/cart_items", CartItemViewSet, basename="cart_items")

urlpatterns = []

urlpatterns += router.urls
