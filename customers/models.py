from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BooleanField, CharField


class Customer(models.Model):
    login = models.CharField(max_length=24)
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

class Product(models.Model):
    name = models.CharField(max_length=50, default="PRODUCT")
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=False, null=True)
    weight = models.DecimalField(max_digits=7, decimal_places=2, blank=False, null=True)
    loose_qty = models.IntegerField
    bundled_quantity = models.IntegerField

    def __str__(self):
        return self.name


class Stock(models.Model):
    loose_quantity = models.IntegerField
    bundled_quantity = models.IntegerField