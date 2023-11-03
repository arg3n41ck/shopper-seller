import factory
import faker
import phonenumbers

from phonenumbers import PhoneNumberFormat

from apps.accounts.models import User
from apps.accounts.constants import UserTypeChoice


fake = faker.Faker()


class BaseUserFactory(factory.django.DjangoModelFactory):
    email = factory.Faker("email")

    class Meta:
        model = User
        django_get_or_create = (
            "email",
            "phone_number",
        )

    @factory.lazy_attribute
    def phone_number(self):
        default_region = "KG"
        phone_number_str = fake.phone_number()
        parsed_phone_number = phonenumbers.parse(phone_number_str, default_region)
        return phonenumbers.format_number(parsed_phone_number, PhoneNumberFormat.E164)


class UserCustomerFactory(BaseUserFactory):
    type = UserTypeChoice.CUSTOMER


class UserSellerFactory(BaseUserFactory):
    type = UserTypeChoice.SELLER
