from apps.products.models import Product, ProductVariant, ProductVariantImage


class ProductCustomerService:
    def __init__(self):
        self.model = Product


class ProductSellerService:
    def __init__(self):
        self.model = Product


class ProductVariantSellerService:
    def __init__(self):
        self.model = ProductVariant
        self.image_model = ProductVariantImage

    def process_creation(self, images_data: dict, variant: ProductVariant):
        images = [self.image_model(variant=variant, **data) for data in images_data]
        self.image_model.objects.bulk_create(images)
