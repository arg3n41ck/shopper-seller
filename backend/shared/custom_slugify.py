from django.db import models
from django.dispatch import receiver
from django.utils.text import slugify

from transliterate import detect_language
from transliterate import slugify as slugify_translit

from shared.utils import generate_random_string


def generate_slug_from_field(field: str):
    def decorator(model):
        assert hasattr(model, field), f"Model has no field {field!r}"
        assert hasattr(model, "slug"), "Model is missing a slug field"

        @receiver(models.signals.pre_save, sender=model, weak=False)
        def generate_slug(sender, instance, *args, raw=False, **kwargs):
            if raw or instance.slug:
                return
            source = getattr(instance, field)
            lang = detect_language(source)
            if lang:
                slug = slugify_translit(source, lang)
            else:
                slug = slugify(source, allow_unicode=True)

            ModelClass = type(instance)
            slug_exists = ModelClass.objects.filter(slug=slug).exists()

            if slug_exists:
                new_slug = "{slug}-{randstr}".format(
                    slug=slug, randstr=generate_random_string(4)
                )
                instance.slug = new_slug
            else:
                instance.slug = slug
        return model
    return decorator
