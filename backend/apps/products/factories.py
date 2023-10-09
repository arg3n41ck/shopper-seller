import random

import factory

from factory import fuzzy
from faker import Faker

from apps.products.models import (
    Category,
    Tag,
    Product,
    ProductVariant,
)
from apps.products.constants import GenderChoice, ProductStatusChoice
from apps.sellers.factories import ShopFactory


def generate_specifications():
    fake = Faker()

    num_specs = random.randint(1, 5)  # You can adjust the number of specifications as needed
    specifications = []

    for _ in range(num_specs):
        specification = {
            "title": fake.word(),
            "value": fake.word()
        }

        specifications.append(specification)

    return specifications


class CategoryFactory(factory.django.DjangoModelFactory):
    title = factory.Faker("word")
    parent = factory.LazyAttribute(lambda x: CategoryFactory(parent=None))

    class Meta:
        model = Category


class TagFactory(factory.django.DjangoModelFactory):
    title = factory.Faker("word")

    class Meta:
        model = Tag


class ProductFactory(factory.django.DjangoModelFactory):
    sku = factory.Faker("word")
    title = factory.Faker("sentence", nb_words=12)
    description = factory.Faker("text")
    recommendation = factory.Faker("text")
    gender = fuzzy.FuzzyChoice([key[0] for key in GenderChoice.choices])
    for_kids = factory.Faker("boolean", locale='en_US')
    price_from = factory.Faker("pydecimal", left_digits=8, right_digits=2)
    discount = factory.Faker("pyint", min_value=0, max_value=100)
    category = factory.SubFactory(CategoryFactory)
    specifications = factory.LazyFunction(lambda: generate_specifications())
    shop = factory.SubFactory(ShopFactory)
    status = fuzzy.FuzzyChoice([key[0] for key in ProductStatusChoice.choices])

    class Meta:
        model = Product

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            # Skip if the 'create' flag is False
            return

        if extracted:
            # If you provide a list of tag instances, associate them with the product
            for tag in extracted:
                self.tags.add(tag)


class ProductVariantFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductVariant
