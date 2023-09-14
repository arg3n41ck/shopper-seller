from rest_framework import viewsets

from apps.customers.models import Customer
from apps.customers.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    http_method_names = ["get", "put", "patch", "delete"]
    filterset_fields = ["user"]
