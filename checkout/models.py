import uuid
import math

from django.db import models
from django.db.models import Sum
from django.conf import settings

from customers.models import Product

from decimal import *


class Order(models.Model):
    order_number = models.CharField(max_length=32, null=False, editable=False)
    full_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    country = models.CharField(max_length=40, null=False, blank=False)
    postcode = models.CharField(max_length=20, null=True, blank=True)
    town_or_city = models.CharField(max_length=40, null=False, blank=False)
    street_address1 = models.CharField(max_length=80, null=False, blank=False)
    street_address2 = models.CharField(max_length=80, null=True, blank=True)
    county = models.CharField(max_length=80, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    delivery_cost = models.DecimalField(max_digits=6, decimal_places=2, null=False, default=0)
    order_total = models.DecimalField(max_digits=10, decimal_places=2, null=False, default=0)
    grand_total = models.DecimalField(max_digits=10, decimal_places=2, null=False, default=0)
    stripe_pid = models.CharField(max_length=254, null=False, blank=False, default='')

    def _generate_order_number(self):
        """
        Generate a random, unique order number using UUID
        """
        return uuid.uuid4().hex.upper()

    def update_total(self):
        """
        Update grand total each time a line item is added,
        accounting for delivery costs.
        """
        #look up how much the order weighs. divide the weight by 2500 and gather the delivery cost per truck
        try:
            this_order = OrderLineItem.objects.get(order_id=self)
            order_item = this_order.product
            quantity = this_order.quantity
            delivery_method = this_order.delivery_method
            product_type = this_order.product_type
            delivery_price = 0
            weight = order_item.weight * int(quantity)

            if delivery_method == "delivery":
                if weight <= 4999:
                    delivery_price += settings.DELIVERY_CHARGE_STANDARD * int(quantity)
                else:
                    delivery_price += settings.DELIVERY_CHARGE_JUMBO * int(quantity) / 2
            if product_type == "stacked":
                delivery_price += settings.STACKING_CHARGE
            if product_type == "bag":
                delivery_price += settings.BAG_DEPOSIT
            price = Decimal(order_item.price) * Decimal(quantity)
            self.order_total = self.lineitems.aggregate(Sum('lineitem_total'))['lineitem_total__sum']

            self.delivery_cost = delivery_price
            self.grand_total = price + Decimal(delivery_price)
            self.save()
        except:
            self.grand_total = 0
            self.deliver_cost = 0
            self.order_total = 0
            self.save()

    def save(self, *args, **kwargs):
        """
        Set an order number
        """
        if not self.order_number:
            self.order_number = self._generate_order_number()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_number


class OrderLineItem(models.Model):
    order = models.ForeignKey(Order, null=False, blank=False,
                                on_delete=models.CASCADE, related_name='lineitems')
    product = models.ForeignKey(Product, null=False, blank=False,
                                on_delete=models.CASCADE)
    product_type = models.CharField(max_length=10, null=True, 
                                blank=True)
    quantity = models.IntegerField(null=False, blank=False, default=0)
    delivery_method = models.CharField(max_length=10, null=True, blank=True)
    lineitem_total = models.DecimalField(max_digits=6, decimal_places=2, 
                                null=False, blank=False, editable=False)

    def save(self, *args, **kwargs):
        """
        Save an order number for each line item
        """
        self.lineitem_total = Decimal(self.product.price) * Decimal(self.quantity)
        super().save(*args, **kwargs)
