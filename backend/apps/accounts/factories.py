import factory

from apps.accounts.models import User
from apps.accounts.constants import UserTypeChoice


class UserBaseFactory(factory.django.DjangoModelFactory):
    email = factory.Faker("email")
    phone_number = factory.Faker("phone_number")

    class Meta:
        model = User
        django_get_or_create = (
            "email",
            "phone_number",
        )


class UserCustomerFactory(UserBaseFactory):
    type = UserTypeChoice.CUSTOMER


class UserSellerFactory(UserBaseFactory):
    type = UserTypeChoice.SELLER
