from django.shortcuts import render, redirect, reverse, get_object_or_404, HttpResponse
from django.conf import settings
from django.contrib import messages
from decimal import Decimal, getcontext
from django.views.decorators.http import require_POST

import math

from bark_farmers.settings import BAG_DEPOSIT, DELIVERY_CHARGE_JUMBO, DELIVERY_CHARGE_STANDARD, STACKING_CHARGE
from profiles.forms import UserProfileForm
from .forms import OrderForm
from .models import OrderLineItem, Order
from profiles.models import UserProfile
import stripe
from customers.models import Product


@require_POST
def cache_checkout_data(request):
    try:
        pid = request.POST.get('client_secret').split('_secret')[0]
        wood_type = request.session.get('wood_type')
        order_item = Product.objects.get(name=wood_type)
        delivery_method = request.session.get('delivery_method')
        product_type = request.session.get('product_type')
        quantity = request.session.get('quantity')
        stripe.api_key = settings.STRIPE_SECRET_KEY
        stripe.PaymentIntent.modify(pid, metadata={
            'username': request.user,
            'save_info': request.POST.get('save_info'),
            "product": order_item,
            "quantity": quantity,
            "delivery_method": delivery_method,
            "product_type": product_type
        })
        return HttpResponse(status=200)
    except Exception as e:
        messages.error(request, 'Sorry, your payment cannot be processed right now. Please try again.')
        return HttpResponse(content=e, status=400)

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
        form_data = {
            'full_name': request.POST['full_name'],
            'email': request.POST['email'],
            'phone_number': request.POST['phone_number'],
            'country': request.POST['country'],
            'postcode': request.POST['postcode'],
            'town_or_city': request.POST['town_or_city'],
            'street_address1': request.POST['street_address1'],
            'street_address2': request.POST['street_address2'],
            'county': request.POST['county'],
        }
        order_form = OrderForm(form_data)
        if order_form.is_valid():
            order = order_form.save(commit=False)
            pid = request.POST.get('client_secret').split('_secret')[0]
            order.stripe_pid = pid
            order.save()
            order_line_item = OrderLineItem(
                order=order,
                product=order_item,
                quantity=quantity,
                delivery_method=delivery_method,
                product_type=product_type
            )
            order_line_item.save()
            request.session['save_info'] = 'save_info' in request.POST
            return redirect(reverse('checkout_success', args=[order.order_number]))
        else:
            return redirect(reverse('checkout_fail'))
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

    if request.user.is_authenticated:
        try:
            profile=UserProfile.objects.get(user=request.user)
            order_form = OrderForm(initial={
                'full_name': profile.user.get_full_name(),
                'email': profile.user.email,
                'phone_number': profile.default_phone_number,
                'country': profile.default_country,
                'postcode': profile.default_postcode,
                'town_or_city': profile.default_town_or_city,
                'street_address1': profile.default_street_address1,
                'street_address2': profile.default_street_address2,
                'county': profile.default_county,
            })
        except UserProfile.DoesNotExist:
            order_form = OrderForm()
    else:
        order_form = OrderForm()

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

    if request.user.is_authenticated:
        profile = UserProfile.objects.get(user=request.user)
        order.user_profile = profile
        order.save()

        if save_info:
            profile_data = {
                'default_phone_number': order.phone_number,
                'default_postcode': order.postcode,
                'default_town_or_city': order.town_or_city,
                'default_street_address1': order.street_address1,
                'default_street_address2': order.street_address2,
                'default_county': order.county,
                'default_country': order.country,
            }
            user_profile_form = UserProfileForm(profile_data, instance=profile)
            if user_profile_form.is_valid():
                user_profile_form.save()

    messages.success(request, f'Order successfully processed. \
        Your order number is {order_number}. A confirmation \
        email will be sent to {order.email}')
    template = 'checkout_success.html'
    context = {
        "order": order,
    }

    return render(request, template, context)

def checkout_fail(request):
    template = 'checkout_fail.html'
    return render(request, template)
