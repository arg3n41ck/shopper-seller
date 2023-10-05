from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from apps.accounts.views import (
    UserViewSet,
    TokenDestroyView,
    UserCustomerCreateApiView,
    UserSellerCreateApiView,
)

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("users/create_customer/", UserCustomerCreateApiView.as_view(), name="user_customer_create"),
    path("users/create_seller/", UserSellerCreateApiView.as_view(), name="user_seller_create"),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("auth/token/logout/", TokenDestroyView.as_view(), name="token_destroy"),
]

urlpatterns += router.urls
