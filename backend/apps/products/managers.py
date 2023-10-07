from django.db import models


class ProductVariantImageManager(models.Manager):
    def bulk_create_with_variant(self, variant, images_data):
        images = [self.image_model(variant=variant, **data) for data in images_data]
        return self.bulk_create(images)
