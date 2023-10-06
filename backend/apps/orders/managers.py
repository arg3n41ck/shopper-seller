from django.db import models


class OrderItemManager(models.Manager):
    def bulk_create_with_order(self, order, items_data):
        items = [self.model(order=order, **data) for data in items_data]
        return self.bulk_create(items)
