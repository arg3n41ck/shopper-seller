from django.conf import settings

from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl_drf.compat import KeywordField, StringField

from apps.products.models import Product
from apps.search_indexes.documents.analyzers import html_strip


INDEX = Index(settings.ELASTICSEARCH_INDEX_NAMES[__name__])

INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1,
)


@INDEX.doc_type
class ProductDocument(Document):
    slug = StringField(analyzer=html_strip)
    sku = StringField(analyzer=html_strip)
    title = StringField(analyzer=html_strip)
    gender = StringField(
        analyzer=html_strip,
        fields={
            "raw": KeywordField(),
        }
    )
    for_kids = fields.BooleanField()
    price_from = fields.DoubleField()
    category = fields.ObjectField(
        attr="category_indexing",
        properties={
            "id": fields.IntegerField(),
            "title": StringField(
                analyzer=html_strip,
                fields={
                    "raw": KeywordField(),
                    "suggest": fields.CompletionField(),
                }
            )
        }
    )
    tags = StringField(
        attr="tags_indexing",
        analyzer=html_strip,
        fields={
            "raw": StringField(analyzer="keyword", multi=True),
            "suggest": fields.CompletionField(multi=True),
        },
        multi=True,
    )
    specifications = fields.ListField(
        fields.ObjectField(
            properties={
                "title": StringField(
                    analyzer=html_strip,
                    fields={
                        "raw": KeywordField(),
                        "suggest": fields.CompletionField(),
                    }
                ),
                "value": StringField(
                    analyzer=html_strip,
                    fields={
                        "raw": KeywordField(),
                        "suggest": fields.CompletionField(),
                    }
                ),
            }
        )
    )
    shop = fields.ObjectField(
        attr="shop_indexing",
        properties={
            "id": fields.IntegerField(),
            "title": StringField(
                analyzer=html_strip,
                fields={
                    "raw": KeywordField(),
                    "suggest": fields.CompletionField(),
                }
            )
        }
    )
    # variants =

    class Django(object):
        model = Product
