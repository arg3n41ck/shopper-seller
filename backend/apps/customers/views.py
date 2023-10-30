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


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsCustomer]
    filterset_fields = ["user"]
