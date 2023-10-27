from elasticsearch_dsl import analyzer

# edge_ngram_completion_filter = token_filter(
#     'edge_ngram_completion_filter',
#     type="edge_ngram",
#     min_gram=1,
#     max_gram=20
# )
#
# edge_ngram_completion = analyzer(
#     "edge_ngram_completion",
#     tokenizer="standard",
#     filter=["lowercase", edge_ngram_completion_filter]
# )

html_strip = analyzer(
    "html_strip",
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)
