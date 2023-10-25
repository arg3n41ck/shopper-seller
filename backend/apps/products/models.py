from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _

from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from django_elasticsearch_dsl_drf.wrappers import dict_to_obj

from apps.sellers.models import Shop
from apps.customers.models import Customer
from apps.products.constants import GenderChoice, ProductStatusChoice
from apps.products.validators import validate_size_variants, validate_specifications
from apps.products.managers import ProductVariantImageManager
from shared.custom_slugify import generate_slug_from_field
from shared.abstract_models import TimeStampedBaseModel


@generate_slug_from_field("title")
class Category(MPTTModel):
    slug = models.SlugField(
        max_length=255,
        unique=True,
        editable=False,
        verbose_name=_("Slug"),
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
    )
    image = models.ImageField(
        upload_to="images/categories",
        verbose_name=_("Image"),
        blank=True,
        null=True,
    )
    parent = TreeForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="children",
        verbose_name=_("Parent"),
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.title


@generate_slug_from_field("title")
class Tag(models.Model):
    slug = models.SlugField(
        max_length=255,
        editable=False,
        verbose_name=_("Slug")
    )
    title = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_("Title"),
    )

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")

    def __str__(self):
        return self.title


@generate_slug_from_field("title")
class Specification(models.Model):
    slug = models.SlugField(
        max_length=255,
        editable=False,
        verbose_name=_("Slug")
    )
    title = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_("Title"),
    )

    class Meta:
        verbose_name = _("Specification")
        verbose_name_plural = _("Specifications")

    def __str__(self):
        return self.title


@generate_slug_from_field("title")
class Product(TimeStampedBaseModel):
    slug = models.SlugField(
        max_length=255,
        unique=True,
        editable=False,
        verbose_name=_("Slug"),
    )
    sku = models.CharField(
        max_length=255,
        verbose_name=_("SKU"),
        blank=True,
        null=True,
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
    )
    description = models.TextField(
        verbose_name=_("Description"),
    )
    recommendation = models.TextField(
        verbose_name=_("Recommendation"),
    )
    gender = models.CharField(
        max_length=255,
        choices=GenderChoice.choices,
        verbose_name=_("Gender"),
    )
    for_kids = models.BooleanField(
        verbose_name=_("For kids"),
    )
    price_from = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name=_("Price from"),
    )
    discount = models.PositiveIntegerField(
        validators=[MinValueValidator(0),
                    MaxValueValidator(100)],
        verbose_name=_("Discount"),
        blank=True,
        null=True,
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products",
        verbose_name=_("Category"),
    )
    country = models.CharField(
        max_length=255,
        verbose_name=_("Country"),
        blank=True,
        null=True,
    )
    tags = models.ManyToManyField(
        Tag,
        related_name="products",
        verbose_name=_("Tag"),
        blank=True,
    )
    """
    Example specifications: [
        {"title": title, "value": value}, 
        ...
    ]
    """
    specifications = models.JSONField(
        validators=[validate_specifications],
        verbose_name=_("Specifications"),
    )
    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE,
        related_name="products",
        verbose_name=_("Shop"),
    )
    publish_date = models.DateTimeField(
        verbose_name=_("Publish date"),
        blank=True,
        null=True,
    )
    status = models.CharField(
        max_length=255,
        choices=ProductStatusChoice.choices,
        default=ProductStatusChoice.DRAFT,
        verbose_name=_("Status"),
    )

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return self.title

    @property
    def discounted_price(self):
        if self.discount is not None:
            discount_amount = (self.discount / 100) * self.price
            return self.price - discount_amount
        return None

    @property
    def rating(self):
        return self.reviews.aggregate(models.Avg("star"))["star__avg"] or 0

    @property
    def shop_indexing(self):
        return dict_to_obj({
            "id": self.shop.id,
            "title": self.shop.title,
        })

    @property
    def category_indexing(self):
        return dict_to_obj({
            "id": self.category.id,
            "title": self.category.title},
        )

    @property
    def tags_indexing(self):
        return [tag.title for tag in self.tags.all()]

    @property
    def variants_indexing(self):
        return [{
            "title": variant.title,
            "image": variant.images.first()
        } for variant in self.variants.all()]


@generate_slug_from_field("title")
class ProductVariant(TimeStampedBaseModel):
    slug = models.SlugField(
        max_length=255,
        unique=True,
        editable=False,
        verbose_name=_("Slug"),
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
        verbose_name=_("Product"),
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
    )
    description = models.TextField(
        verbose_name=_("Description"),
    )
    """
    Example size variants: [
        {"size", "quantity"}, 
        ...
    ]
    """
    size_variants = models.JSONField(
        validators=[validate_size_variants],
        verbose_name=_("Size variants"),
    )

    class Meta:
        verbose_name = _("Product variant")
        verbose_name_plural = _("Product variants")

    def __str__(self):
        return self.title


class ProductVariantImage(models.Model):
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name=_("Variant"),
    )
    image = models.ImageField(
        upload_to="images/products",
        verbose_name=_("Image"),
    )

    objects = ProductVariantImageManager()

    class Meta:
        verbose_name = _("Product image")
        verbose_name_plural = _("Product images")

    def __str__(self):
        return self.variant.title


class ProductFavourite(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="favourites",
        verbose_name=_("Product"),
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="product_favourites",
        verbose_name=_("Customer"),
    )

    class Meta:
        verbose_name = _("Product favourite")
        verbose_name_plural = _("Product favourites")
        unique_together = ("product", "customer")


class ProductReview(TimeStampedBaseModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name=_("Product"),
    )
    star = models.FloatField(
        validators=[MinValueValidator(0.0),
                    MaxValueValidator(5.0)],
        verbose_name=_("Star"),
    )
    review = models.TextField(
        verbose_name=_("Review"),
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="product_reviews",
        verbose_name=_("Customer"),
    )

    class Meta:
        verbose_name = _("Product review")
        verbose_name_plural = _("Product reviews")
