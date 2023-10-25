from rest_framework.routers import DefaultRouter

from apps.customers.views import (
    CustomerViewSet,
    ShopViewSet,
    ProductViewSet,
    ProductFavouriteViewSet,
    ProductReviewViewSet,
)

router = DefaultRouter()
router.register("customers", CustomerViewSet, basename="customers")
router.register("shops", ShopViewSet, basename="shops")
router.register("products", ProductViewSet, basename="products")
router.register("products/favourites", ProductFavouriteViewSet, basename="products_favourites")
router.register("products/reviews", ProductReviewViewSet, basename="products_reviews")

urlpatterns = router.urls
