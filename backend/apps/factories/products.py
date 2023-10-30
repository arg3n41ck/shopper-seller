import factory.fuzzy
import faker

from apps.products.models import (
    Category,
    Tag,
    Specification,
    Product,
    ProductVariant,
)
from apps.products.constants import GenderChoice, ProductStatusChoice
from apps.factories.sellers import ShopFactory


fake = faker.Faker()


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    title = factory.Faker("word")
    parent = factory.LazyAttribute(lambda x: CategoryFactory(parent=None))


class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    title = factory.Faker("word")


class SpecificationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Specification

    title = factory.Faker("word")


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
        django_get_or_create = (
            "sku",
        )

    sku = factory.Faker("word")
    title = factory.Faker("sentence", nb_words=12)
    description = factory.Faker("text")
    recommendation = factory.Faker("text")
    gender = factory.fuzzy.FuzzyChoice(choices=[key[0] for key in GenderChoice.choices])
    for_kids = factory.Faker("boolean")
    price_from = factory.fuzzy.FuzzyDecimal(low=1, high=20000)
    discount = factory.Faker("pyint", min_value=0, max_value=100)
    category = factory.SubFactory(CategoryFactory)
    shop = factory.SubFactory(ShopFactory)
    status = factory.fuzzy.FuzzyChoice(choices=[key[0] for key in ProductStatusChoice.choices])

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create or not extracted:
            return

        self.tags.add(*extracted)

    @factory.lazy_attribute
    def specifications(self, specs: int = 3):
        return [
            {"title": fake.word(), "value": fake.word()}
            for _ in range(specs)
        ]


class ProductVariantFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductVariant
