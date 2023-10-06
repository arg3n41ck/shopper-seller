from rest_framework import viewsets

from apps.customers.models import Customer
from apps.customers.permissions import IsCustomer
from apps.customers.serializers import (
    CustomerSerializer,
)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsCustomer]
    filterset_fields = ["user"]
