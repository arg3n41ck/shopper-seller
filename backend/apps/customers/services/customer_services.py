from typing import Optional

from apps.accounts.constants import UserTypeChoice
from apps.accounts.services.jwt_service import JWTService
from apps.accounts.services.user_service import UserService
from apps.customers.models import Customer
from apps.orders.models import Cart


class UserCustomerService:
    def __init__(self):
        self.customer_model = Customer
        self.cart_model = Cart
        self.user_service = UserService()
        self.jwt_service = JWTService()

    def create_user(self, customer_data: dict, phone_number: Optional[str] = None, email: Optional[str] = None,
                    password: Optional[str] = None) -> dict:
        user = self.user_service.create_user_by_email_or_phone(
            email=email,
            phone_number=phone_number,
            password=password,
            user_type=UserTypeChoice.CUSTOMER,
        )
        customer = self.customer_model.objects.create(user=user, **customer_data)
        self.cart_model.objects.create(customer=customer)
        return self.jwt_service.create_user_token(user=user)
