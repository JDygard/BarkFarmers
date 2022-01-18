from customers.models import Customer
from django.contrib import admin
from .models import Product, Stock

# Register your models here.
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Stock)