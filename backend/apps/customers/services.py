from django.contrib.auth import get_user_model

from apps.customers.models import Customer


User = get_user_model()


class CustomerService:
    def __init__(self):
        self.model = Customer

    def create_customer(self, user: User, customer_data: dict) -> Customer:
        return self.model.objects.create(user=user, **customer_data)
