from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.pagination import LimitOffsetPagination
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
    TermsFacet, Q,
)

from apps.search_indexes.documents.products import ProductDocument
from apps.search_indexes.serializers.products import ProductDocumentSerializer
from apps.sellers.permissions import IsSeller
from apps.products.constants import ProductStatusChoice
from apps.search_indexes.backends import OwnerFilterBackend
# from Project.swagger import ELASTICSEARCH


class BaseProductDocumentViewSet(DocumentViewSet):
    document = ProductDocument
    serializer_class = ProductDocumentSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = "slug"
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
        FacetedSearchFilterBackend,
        SuggesterFilterBackend,
    ]


class CustomerProductDocumentViewSet(BaseProductDocumentViewSet):
    search_fields = {
        "title": {"fuzziness": "AUTO", "boost": 4},
        "category.title": {"fuzziness": "AUTO", "boost": 3},
        "tags": {"fuzziness": "AUTO", "boost": 2},
        "shop.title": {"fuzziness": "AUTO", "boost": 1},
    }
    faceted_search_fields = {
        "shop": {
            "field": "shop.raw",
            "facet": TermsFacet,
            "enabled": True,
        }
    }
    suggester_fields = {
        "category_suggest": {
            "field": "category.title.suggest",
            "suggesters": [
                SUGGESTER_COMPLETION,
            ],
            "options": {
                "size": 20,  # Override default number of suggestions
                "skip_duplicates": True,  # Whether duplicate suggestions should be filtered out.
            },
        },
    }
    filter_fields = {
        "gender": "gender.raw",
        "for_kids": "for_kids",
        "status": "status.raw",
    }
    ordering_fields = {
        "title": "title.raw",
        "price": "price.raw",
    }
    ordering = ("_score",)


class SellerProductDocumentViewSet(BaseProductDocumentViewSet):
    filter_backends = [
        OwnerFilterBackend,
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
        FacetedSearchFilterBackend,
        SuggesterFilterBackend,
    ]
    permission_classes = (IsSeller,)
    search_fields = {
        "sku": None,
        "title": {"fuzziness": "AUTO"},
    }
    faceted_search_fields = {}
    suggester_fields = {
        "category_suggest": {
            "field": "category.title.suggest",
            "suggesters": [
                SUGGESTER_COMPLETION,
            ],
            "options": {
                "size": 20,  # Override default number of suggestions
                "skip_duplicates": True,  # Whether duplicate suggestions should be filtered out.
            },
        },
    }
    filter_fields = {
        "gender": "gender.raw",
        "for_kids": "for_kids",
        "status": "status.raw",
    }
    ordering_fields = {
        "title": "title.raw",
        "price": "price.raw",
    }
    ordering = ("_score",)
