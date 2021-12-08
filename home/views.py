from django.shortcuts import render
from django.http import HttpResponseRedirect
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
    context = {
        'order_form': order_form,
        'products': products,
    }

    return render(request, 'home/order.html', context)

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')