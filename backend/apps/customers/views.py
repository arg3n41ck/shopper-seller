from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from apps.customers.models import Customer
from apps.customers.permissions import IsCustomer
from apps.customers.serializers import CustomerSerializer
from apps.products.models import (
    Product,
    ProductFavourite,
    ProductReview,
)
from apps.products.serializers import (
    ProductSerializer,
    ProductFavouriteSerializer,
    ProductReviewSerializer,
)
from apps.sellers.models import Shop
from apps.sellers.serializers import ShopSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsCustomer]
    filterset_fields = ["user"]


class ProductViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Product.objects.all().prefetch_related("variants", "reviews")
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all().prefetch_related("branches")
    serializer_class = ShopSerializer
    lookup_field = "slug"


class ProductFavouriteViewSet(viewsets.ModelViewSet):
    queryset = ProductFavourite.objects.all()
    serializer_class = ProductFavouriteSerializer
    permission_classes = [IsCustomer]


class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    permission_classes = [IsCustomer]
