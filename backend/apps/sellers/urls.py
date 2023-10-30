from rest_framework.routers import DefaultRouter

from apps.sellers.views import (
    SellerShopViewSet,
    SellerShopBranchViewSet,
    CustomerShopViewSet,
)

router = DefaultRouter()
router.register("seller/shops", SellerShopViewSet, basename="seller_shops")
router.register("seller/shop_branches", SellerShopBranchViewSet, basename="seller_shop_branches")
router.register("customer/shops", CustomerShopViewSet, basename="customer_shops")

urlpatterns = []

urlpatterns += router.urls
