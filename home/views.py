from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import HardwoodOrder

# Create your views here.

def index(request):
    """ View returns index page """
    return render(request, 'home/index.html')

def order(request):
    """ View returns order page"""
    if request.method == "POST":
        form = HardwoodOrder(request.POST)
        if form.is_valid():
            return HttpResponseRedirect("/thanks/")
    else:
        form = HardwoodOrder()
    return render(request, 'home/order.html', {"form": form})

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')