from django.db import models

from apps.orders.models import Order


class OrderItemManager(models.Manager):
    def bulk_create_with_order(self, order: Order, items_data: list[dict]):
        items = [self.model(order=order, **data) for data in items_data]
        return self.bulk_create(items)
