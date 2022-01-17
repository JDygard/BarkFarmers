from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.conf import settings
from django.contrib import messages
from decimal import Decimal, getcontext

import math

from bark_farmers.settings import BAG_DEPOSIT, DELIVERY_CHARGE_JUMBO, DELIVERY_CHARGE_STANDARD, STACKING_CHARGE
from .forms import OrderForm
from .models import OrderLineItem, Order
import stripe
from customers.models import Product

def checkout(request):
    stripe_public_key = settings.STRIPE_PUBLIC_KEY
    stripe_secret_key = settings.STRIPE_SECRET_KEY
    stripe_total = 0

    wood_type = request.session.get('wood_type')
    order_item = Product.objects.get(name=wood_type)
    delivery_method = request.session.get('delivery_method')
    product_type = request.session.get('product_type')
    quantity = request.session.get('quantity')

    if request.method == 'POST':
        print("got this far")
        form_data = {
            'full_name': request.POST['full_name'],
            'email': request.POST['full_name'],
            'phone_number': request.POST['full_name'],
            'country': request.POST['country'],
            'postcode': request.POST['postcode'],
            'town_or_city': request.POST['town_or_city'],
            'street_address1': request.POST['street_address1'],
            'street_address2': request.POST['street_address2'],
            'county': request.POST['county'],
        }
        order_form = OrderForm(form_data)
        if order_form.is_valid():
            order = order_form.save()
            order_line_item = OrderLineItem(
                order=order,
                name=order_item,
                quantity=quantity,
                delivery_method=delivery_method,
                product_type=product_type
            )
            request.session['save_info'] = 'save_info' in request.POST
            return redirect(reverse('checkout_success', args=[order.order_number]))
        else:
            return redirect(reverse('index'))
    else:
        order_form = OrderForm()
        template = 'checkout.html'
        delivery_price = 0
        weight = order_item.weight * int(quantity)

        if delivery_method == "delivery":
            if weight <= 4999:
                delivery_price += DELIVERY_CHARGE_STANDARD * int(quantity)
            else:
                delivery_price += DELIVERY_CHARGE_JUMBO * int(quantity) / 2
        if product_type == "stacked":
            delivery_price += STACKING_CHARGE
        if product_type == "bag":
            delivery_price += BAG_DEPOSIT
        price = Decimal(order_item.price) * Decimal(quantity) + Decimal(delivery_price)
        price = math.ceil(price*100)

        stripe_total = price
        stripe.api_key = stripe_secret_key
        intent = stripe.PaymentIntent.create(
            amount = stripe_total,
            currency="USD",
        )              

    context = {
        'order_form': order_form,
        'stripe_public_key': stripe_public_key,
        'client_secret': intent.client_secret,
        'stripe_total': stripe_total/100,
    }

    return render(request, template, context)

def checkout_success(request, order_number):
    save_info = request.session.get('save_info')
    order = get_object_or_404(Order, order_number=order_number)
    messages.success(request, f'Order successfully processed. \
        Your order number is {order_number}. A confirmation \
        email will be sent to {order.email}')
    template = 'checkout/checkout_success.html'
    context = {
        order: order,
    }

    return render(request, template, context)
