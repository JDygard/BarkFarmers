# Generated by Django 3.2.7 on 2021-12-08 08:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='invoice',
            name='customer',
        ),
        migrations.RemoveField(
            model_name='invoice',
            name='product_id',
        ),
        migrations.DeleteModel(
            name='Stock',
        ),
        migrations.DeleteModel(
            name='Customer',
        ),
        migrations.DeleteModel(
            name='Invoice',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
