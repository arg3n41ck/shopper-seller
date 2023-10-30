from rest_framework.routers import DefaultRouter

from apps.products.views import (
    CategoryViewSet,
    TagViewSet,
    SpecificationViewSet,
    SellerProductViewSet,
    SellerProductVariantViewSet,
    SellerProductVariantImageViewSet,
    CustomerProductViewSet,
    CustomerProductFavouriteViewSet,
    CustomerProductReviewViewSet
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="categories")
router.register("tags", TagViewSet, basename="tags")
router.register("specifications", SpecificationViewSet, basename="specifications")
router.register("seller/products", SellerProductViewSet, basename="seller_products")
router.register("seller/product_variants", SellerProductVariantViewSet, basename="seller_product_variants")
router.register("seller/variant_images", SellerProductVariantImageViewSet, basename="seller_variant_images")
router.register("customer/products", CustomerProductViewSet, basename="customer_products")
router.register("customer/favourites", CustomerProductFavouriteViewSet, basename="customer_favourites")
router.register("customer/reviews", CustomerProductReviewViewSet, basename="customer_reviews")

urlpatterns = []

urlpatterns += router.urls
