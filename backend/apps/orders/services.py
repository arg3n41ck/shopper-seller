from apps.orders.models import Order, OrderItem, Cart
from apps.customers.models import Customer


class CartService:
    def __init__(self):
        self.model = Cart

    def create_cart(self, customer: Customer):
        return self.model.objects.create(customer=customer)

class OrderSellerService:
    def __init__(self):
        self.model = Order
        self.item_model = OrderItem

    def create_order_items(self, order: Order, items_data: dict):
        items = [self.item_model(order=order, **data) for data in items_data]
        order_items = self.item_model.objects.bulk_create(items)
