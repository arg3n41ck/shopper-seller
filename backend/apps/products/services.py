from apps.products.models import Product, ProductVariant, ProductVariantImage


class ProductCustomerService:
    def __init__(self):
        self.model = Product


class ProductSellerService:
    def __init__(self):
        self.model = Product

    def create_product(self):
        pass
