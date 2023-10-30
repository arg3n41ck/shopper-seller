import factory

from apps.customers.models import Customer
from apps.customers.constants import CustomerPreferenceChoice
from apps.factories.users import UserCustomerFactory


class CustomerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Customer

    user = factory.SubFactory(UserCustomerFactory)
    date_of_birth = factory.Faker("date_time")
    preferences = factory.Faker("random_elements", elements=CustomerPreferenceChoice.choices, length=3)
