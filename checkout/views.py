from django.shortcuts import render, redirect, reverse
from django.conf import settings
from .forms import OrderForm

def checkout(request):
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY

    print("request successful")
    if request.method == "POST":
        print("Post request successful")

    order_form = OrderForm()
    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
    }

    return render(request, template, context)