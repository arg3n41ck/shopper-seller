from rest_framework.routers import DefaultRouter

from apps.sellers.views import ShopCustomerViewSet, ShopSellerViewSet, ShopBranchViewSet

router = DefaultRouter()
router.register("customer/shops", ShopCustomerViewSet, basename="customer_shops")
router.register("seller/shops", ShopSellerViewSet, basename="seller_shops")
router.register("seller/branches", ShopBranchViewSet, basename="seller_branches")

urlpatterns = []

urlpatterns += router.urls
