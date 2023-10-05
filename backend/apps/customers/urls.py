from rest_framework.routers import DefaultRouter

from apps.customers.views import CustomerViewSet, CartViewSet, CartItemViewSet

router = DefaultRouter()
router.register("customers", CustomerViewSet, basename="customers")
router.register("carts", CartViewSet, basename="carts")
router.register("cart_items", CartItemViewSet, basename="cart_items")

urlpatterns = router.urls
