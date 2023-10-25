from rest_framework.routers import DefaultRouter

from apps.sellers.views import (
    ShopViewSet,
    ShopBranchViewSet,
    ProductViewSet,
    ProductVariantViewSet,
    ProductVariantImageViewSet,
)

router = DefaultRouter()
router.register("shops", ShopViewSet, basename="shops")
router.register("branches", ShopBranchViewSet, basename="branches")
router.register("products", ProductViewSet, basename="products")
router.register("products/variants", ProductVariantViewSet, basename="products_variants")
router.register("products/variant_images", ProductVariantImageViewSet, basename="products_variant_images")

urlpatterns = []

urlpatterns += router.urls
