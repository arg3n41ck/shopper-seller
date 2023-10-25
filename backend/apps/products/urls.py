from rest_framework.routers import DefaultRouter

from apps.products.views import (
    CategoryViewSet,
    TagViewSet,
    SpecificationViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="categories")
router.register("tags", TagViewSet, basename="tags")
router.register("specifications", SpecificationViewSet, basename="specifications")

urlpatterns = []

urlpatterns += router.urls
