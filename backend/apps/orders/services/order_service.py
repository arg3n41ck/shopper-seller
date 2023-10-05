from apps.orders.models import Order, OrderItem


class OrderCustomerService:
    def __init__(self):
        self.order_model = Order
        self.item_model = OrderItem

    def process_creation(self, order: Order, items_data: list[dict]) -> None:
        order_items = self.item_model.objects.bulk_create_with_order(order=order, items_data=items_data)
