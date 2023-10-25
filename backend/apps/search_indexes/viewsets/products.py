from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.constants import (
    SUGGESTER_COMPLETION,
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    LOOKUP_QUERY_EXCLUDE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
    FacetedSearchFilterBackend,
    SuggesterFilterBackend,
    CompoundSearchFilterBackend,
)
from elasticsearch_dsl import (
    DateHistogramFacet,
    RangeFacet,
    TermsFacet,
)

from apps.search_indexes.documents.products import ProductDocument
from apps.search_indexes.serializers.products import ProductDocumentSerializer

# from Project.swagger import ELASTICSEARCH


class ProductDocumentViewSet(DocumentViewSet):
    document = ProductDocument
    serializer_class = ProductDocumentSerializer
    # pagination_class = CustomLimitOffsetPagination
    lookup_field = "slug"
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
        FacetedSearchFilterBackend,
        SuggesterFilterBackend,
    ]
    search_fields = {
        "sku": None,
        "title": {"fuzziness": "AUTO", "boost": 4},
        "category.title": {"fuzziness": "AUTO", "boost": 3},
        "shop.title": {"fuzziness": "AUTO", "boost": 2},
        "tags": {"fuzziness": "AUTO", "boost": 1},
    }
    suggester_fields = {
        "category_suggest": {
            "field": "category.title.suggest",
            "suggesters": [
                SUGGESTER_COMPLETION,
            ],
            # "options": {
            #     "size": 20,  # Override default number of suggestions
            #     "skip_duplicates": True,  # Whether duplicate suggestions should be filtered out.
            # },
        },
    }
    faceted_search_fields = {
        "shop": {
            "field": "shop.raw",
            "facet": TermsFacet,
            "enabled": True,
        }
    }
    filter_fields = {}
    ordering_fields = {
        "title": "title.raw",
        "price": "price.raw",
    }
    ordering = ("_score",)
