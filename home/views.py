from django.shortcuts import render
from django.http import HttpResponseRedirect
from checkout.forms import OrderForm

# Create your views here.

def index(request):
    """ View returns index page """
    return render(request, 'home/index.html')

def order(request):
    """ View returns order page"""
    order_form = OrderForm()
    context = {
        'order_form': order_form,
    }
    return render(request, 'home/order.html', context)

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')