from rest_framework.routers import DefaultRouter

from apps.search_indexes.viewsets.products import (
    SellerProductDocumentViewSet,
    CustomerProductDocumentViewSet,
)


router = DefaultRouter()
router.register(r"seller/products", SellerProductDocumentViewSet, basename="seller_products_document")
router.register(r"customer/products", CustomerProductDocumentViewSet, basename="customer_products_document")

app_name = "elastic"

urlpatterns = router.urls
