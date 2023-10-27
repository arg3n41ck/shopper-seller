from rest_framework.routers import DefaultRouter

from apps.customers.views import (
    CustomerViewSet,
)

router = DefaultRouter()
router.register("customers", CustomerViewSet, basename="customers")

urlpatterns = []

urlpatterns += router.urls
