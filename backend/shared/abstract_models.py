from django.db import models
from django.utils.translation import gettext_lazy as _


class TimeStampedBaseModel(models.Model):
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Created at")
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name=_("Updated at")
    )

    class Meta:
        abstract = True


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
