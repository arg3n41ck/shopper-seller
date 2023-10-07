from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from apps.products.models import Product


@registry.register_document
class ProductDocument(Document):
    class Index:
        name = "products"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }

    slug = fields.KeywordField(attr="slug")
    sku = fields.KeywordField()
    title = fields.TextField()
    gender = fields.KeywordField()
    for_kids = fields.BooleanField()
    price_from = fields.FloatField()
    discount = fields.IntegerField()
    category = fields.ObjectField(properties={
        "id": fields.KeywordField(),
        "title": fields.TextField(),
        "parent": fields.ObjectField(properties={
            "slug": fields.KeywordField(),
            "title": fields.TextField(),
        }),
    })
    tags = fields.KeywordField(multi=True)
    specifications = fields.ObjectField()
    shop = fields.ObjectField(properties={
        "id": fields.KeywordField(),
        "title": fields.TextField(),
    })
    status = fields.KeywordField()

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
            "category",
            "tags",
            "specifications",
            "shop",
            "status",
        )
