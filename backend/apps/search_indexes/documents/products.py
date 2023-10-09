from django.conf import settings

from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry

from apps.products.models import Product


INDEX = Index(settings.ELASTICSEARCH_INDEX_NAMES[__name__])

INDEX.settings(
    number_of_shards=1,
    number_of_replicas=0,
)


@registry.register_document
class ProductDocument(Document):
    category = fields.ObjectField(properties={
        "id": fields.KeywordField(),
        "title": fields.TextField(),
        "parent": fields.ObjectField(properties={
            "slug": fields.KeywordField(),
            "title": fields.TextField(),
        }),
    })
    tags = fields.KeywordField(multi=True)
    specifications = fields.ObjectField(properties={})
    shop = fields.ObjectField(properties={
        "id": fields.KeywordField(),
        "title": fields.TextField(),
    })

    class Django:
        model = Product
        fields = (
            "slug",
            "sku",
            "title",
            "gender",
            "for_kids",
            "price_from",
            "discount",
            "status",
        )
