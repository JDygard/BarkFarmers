from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BooleanField, CharField


class Customer(models.Model):
    login = models.CharField(max_length=24)
    name = models.CharField(max_length=24)
    address_one = models.CharField(max_length=24)
    address_two = models.CharField(max_length=24, blank=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    stripe_id = models.CharField(max_length=30, blank=True)
    zip = models.IntegerField()
    phone = models.IntegerField()
    mobile = models.IntegerField()
    email = models.EmailField(max_length=64)
    commercial_account = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'customers'

        def __unicode__(self):
            return u"%s's Subscription Info" % self.user_rec


class Invoice(models.Model):
    customer = models.ForeignKey('Customer', null=True, blank=False, on_delete=models.SET_NULL)
    product_id = models.ForeignKey('Product', null=True, blank=False, on_delete=models.SET_NULL)
    invoice_date = models.DateField(auto_now=False, auto_now_add=True)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    delivery = models.BooleanField()
    delivery_address_one = models.CharField(max_length=50, blank=True, null=True)
    delivery_address_two = models.CharField(max_length=50, blank=True, null=True)
    delivery_city = models.CharField(max_length=50, blank=True, null=True)
    delivery_state = models.CharField(max_length=50, blank=True, null=True)


class Product(models.Model):
    product_name = models.CharField(max_length=50, default="PRODUCT")
    product_price = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=True)


class Stock(models.Model):
    loose_quantity = models.IntegerField
    bundled_quantity = models.IntegerField