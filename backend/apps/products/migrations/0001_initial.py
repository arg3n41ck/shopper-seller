# Generated by Django 4.2.1 on 2023-10-06 07:38

import apps.products.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('customers', '0001_initial'),
        ('sellers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(editable=False, max_length=255, unique=True, verbose_name='Slug')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('image', models.ImageField(upload_to='images/categories', verbose_name='Image')),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='products.category', verbose_name='Parent')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('slug', models.SlugField(editable=False, max_length=255, unique=True, verbose_name='Slug')),
                ('sku', models.CharField(blank=True, max_length=255, null=True, verbose_name='SKU')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('recommendation', models.TextField(verbose_name='Recommendation')),
                ('gender', models.CharField(choices=[('MALE', 'Male'), ('FEMALE', 'Female')], max_length=255, verbose_name='Gender')),
                ('for_kids', models.BooleanField(verbose_name='For kids')),
                ('price_from', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Price')),
                ('discount', models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Discount')),
                ('country', models.CharField(blank=True, max_length=255, null=True, verbose_name='Country')),
                ('specifications', models.JSONField(validators=[apps.products.validators.validate_specifications], verbose_name='Specifications')),
                ('publish_date', models.DateTimeField(blank=True, null=True, verbose_name='Publish date')),
                ('status', models.CharField(choices=[('DRAFT', 'Draft'), ('ACTIVE', 'Active'), ('ARCHIVE', 'Archive')], default='DRAFT', max_length=255, verbose_name='Status')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='products.category', verbose_name='Category')),
                ('shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='sellers.shop', verbose_name='Shop')),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
            },
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('slug', models.SlugField(editable=False, max_length=255, unique=True, verbose_name='Slug')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('size_variants', models.JSONField(validators=[apps.products.validators.validate_size_variants], verbose_name='Size variants')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='products.product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Product variant',
                'verbose_name_plural': 'Product variants',
            },
        ),
        migrations.CreateModel(
            name='Specification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(editable=False, max_length=255, verbose_name='Slug')),
                ('title', models.CharField(max_length=255, unique=True, verbose_name='Title')),
            ],
            options={
                'verbose_name': 'Specification',
                'verbose_name_plural': 'Specifications',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(editable=False, max_length=255, verbose_name='Slug')),
                ('title', models.CharField(max_length=255, unique=True, verbose_name='Title')),
            ],
            options={
                'verbose_name': 'Tag',
                'verbose_name_plural': 'Tags',
            },
        ),
        migrations.CreateModel(
            name='ProductVariantImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/products', verbose_name='Image')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.productvariant', verbose_name='Variant')),
            ],
            options={
                'verbose_name': 'Product image',
                'verbose_name_plural': 'Product images',
            },
        ),
        migrations.CreateModel(
            name='ProductReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('star', models.FloatField(validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)], verbose_name='Star')),
                ('review', models.TextField(verbose_name='Review')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_reviews', to='customers.customer', verbose_name='Customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='products.product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Product review',
                'verbose_name_plural': 'Product reviews',
            },
        ),
        migrations.AddField(
            model_name='product',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='products', to='products.tag', verbose_name='Tag'),
        ),
        migrations.CreateModel(
            name='ProductFavourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_favourites', to='customers.customer', verbose_name='Customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favourites', to='products.product', verbose_name='Product')),
            ],
            options={
                'verbose_name': 'Product favourite',
                'verbose_name_plural': 'Product favourites',
                'unique_together': {('product', 'customer')},
            },
        ),
    ]
