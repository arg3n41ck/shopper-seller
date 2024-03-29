from rest_framework.routers import DefaultRouter

from apps.search_indexes.viewsets.products import (
    ProductDocumentViewSet,
)


router = DefaultRouter()
router.register(r"products", ProductDocumentViewSet, basename="products")

app_name = "elastic"

urlpatterns = router.urls
