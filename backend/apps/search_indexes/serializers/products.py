from django_elasticsearch_dsl_drf.serializers import DocumentSerializer

from apps.search_indexes.documents.products import ProductDocument


class ProductDocumentSerializer(DocumentSerializer):
    class Meta:
        document = ProductDocument
