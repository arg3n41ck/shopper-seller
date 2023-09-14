from apps.orders.models import Order, OrderItem


class OrderSellerService:
    def __init__(self):
        self.model = Order
        self.item_model = OrderItem

    def create_order_items(self, order: Order, items_data: dict):
        items = [self.item_model(order=order, **data) for data in items_data]
        order_items = self.item_model.objects.bulk_create(items)
