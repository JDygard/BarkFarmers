from django.shortcuts import render

# Create your views here.

def index(request):
    """ View returns index page """
    return render(request, 'home/index.html')

def order(request):
    """ View returns order page"""
    return render(request, 'home/order.html')
