from django.shortcuts import render
from django.http import HttpResponseRedirect

# Create your views here.

def index(request):
    """ View returns index page """
    return render(request, 'home/index.html')

def order(request):
    """ View returns order page"""
    return render(request, 'home/order.html')

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')