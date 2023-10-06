from rest_framework.routers import DefaultRouter

from apps.orders.views import (
    OrderCustomerViewSet,
    OrderSellerViewSet
)

router = DefaultRouter()
router.register("customer/orders", OrderCustomerViewSet, basename="customer_orders")
router.register("seller/orders", OrderSellerViewSet, basename="seller_orders")

urlpatterns = []

urlpatterns += router.urls