import factory

from apps.customers.models import Customer
from apps.customers.constants import CustomerPreferenceChoice
from apps.accounts.factories import UserCustomerFactory


class CustomerFactory(factory.django.DjangoModelFactory):
    user = factory.SubFactory(UserCustomerFactory)
    date_of_birth = factory.Faker("date_time")
    preferences = factory.Faker("random_elements", elements=CustomerPreferenceChoice.choices, length=3)

    class Meta:
        model = Customer
