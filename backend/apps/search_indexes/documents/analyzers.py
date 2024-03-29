from elasticsearch_dsl import analyzer
from django_elasticsearch_dsl_drf.versions import ELASTICSEARCH_GTE_7_0


if ELASTICSEARCH_GTE_7_0:
    _filters = ["lowercase", "stop", "snowball"]
else:
    _filters = ["standard", "lowercase", "stop", "snowball"]

html_strip = analyzer(
    "html_strip",
    tokenizer="standard",
    filter=_filters,
    char_filter=["html_strip"]
)
