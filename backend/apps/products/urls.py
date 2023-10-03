from rest_framework.routers import DefaultRouter

from apps.products.views import (
    CategoryViewSet,
    TagViewSet,
    ProductCustomerViewSet,
    ProductSellerViewSet,
    ProductVariantSellerViewSet,
    ProductVariantImageSellerViewSet,
    SpecificationViewSet,
    ProductFavouriteViewSet,
    ProductReviewViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="categories")
router.register("tags", TagViewSet, basename="tags")
router.register("specifications", SpecificationViewSet, basename="specifications")
router.register("customer/products", ProductCustomerViewSet, basename="customer_products")
router.register("customer/favourites", ProductFavouriteViewSet, basename="customer_favourites")
router.register("customer/reviews", ProductReviewViewSet, basename="product_reviews")
router.register("seller/products", ProductSellerViewSet, basename="seller_products")
router.register("seller/variants", ProductVariantSellerViewSet, basename="seller_variants")
router.register("seller/variants/images", ProductVariantImageSellerViewSet, basename="seller-variants-images")

urlpatterns = []

urlpatterns += router.urls
