from django.shortcuts import render, redirect, reverse
from django.conf import settings
from .forms import OrderForm
import stripe

def checkout(request):
    order_form = OrderForm()
    template = 'checkout.html'
    context = {
        'order_form': order_form,
    }
    delivery_method = request.session.get('delivery_method')
    product_type = request.session.get('product_type')
    quantity = request.session.get('quantity')

    order_context = request.POST
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY
    stripe_total = 900
    stripe.api_key = stripe_secret_key
    intent = stripe.PaymentIntent.create(
        amount = stripe_total,
        currency="USD",
    )

    return render(request, template, context)