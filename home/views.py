from django.shortcuts import render
from django.http import HttpResponseRedirect
from bark_farmers.settings import BAG_DEPOSIT, DELIVERY_CHARGE_JUMBO, DELIVERY_CHARGE_STANDARD, JUMBO_DELIVERY_THRESHOLD, STACKING_CHARGE
from checkout.forms import OrderForm
from customers.models import Product

# Create your views here.

def index(request):
    """ View returns index page """
    return render(request, 'home/index.html')

def order(request):
    """ View returns order page"""
    order_form = OrderForm()
    products = Product.objects.all()
    shipping_data = {
        'bag_deposit':  BAG_DEPOSIT,
        'delivery_charge_standard': DELIVERY_CHARGE_STANDARD,
        'delivery_charge_jumbo': DELIVERY_CHARGE_JUMBO,
        'jumbo_delivery_threshold': JUMBO_DELIVERY_THRESHOLD,
        'stacking_charge': STACKING_CHARGE
    }
    context = {
        'order_form': order_form,
        'products': products,
        'shipping_data': shipping_data,
    }

    return render(request, 'home/order.html', context)

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')