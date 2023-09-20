from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.customers.models import Customer
from apps.accounts.permissions import IsCustomer
from apps.customers.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated, IsCustomer]
    http_method_names = ["get", "put", "patch", "delete"]
    filterset_fields = ["user"]
