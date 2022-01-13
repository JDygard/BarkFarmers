from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponseRedirect
from bark_farmers.settings import BAG_DEPOSIT, DELIVERY_CHARGE_JUMBO, DELIVERY_CHARGE_STANDARD, JUMBO_DELIVERY_THRESHOLD, STACKING_CHARGE
from checkout.forms import OrderForm
from customers.models import Product
import stripe
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
        'stripe_public_key': "pk_test_51JnL4xIC2c9xnZcNHBlkLDVqv7VsvItgEv2gxkCxGA35xj44WO5J9ESJqWLqtQsnEl2Go0T6DXnppbH9sOohrhrd005cRrLFsL",
        'client_secret': "test client secret"
    }

    if request.method == "POST":
        # Take order information, add it to context, return render the checkout page
        order_context = {
            'delivery_method': request.POST.__getitem__('delivery_method'),
            'product_type': request.POST.__getitem__('product_type'),
            'quantity': request.POST.__getitem__('quantity')
        }
        return render(request, 'checkout/checkout.html', order_context)

    # order_context = request.POST
    # stripe_public_key = settings.STRIPE_PUBLIC_KEY
    # stripe_secret_key = settings.STRIPE_SECRET_KEY

    # stripe_total = 9
    # stripe.api_key = stripe_secret_key
    # intent = stripe.PaymentIntent.create(
    #     amount = stripe_total,
    #     currency=settings.STRIPE_CURRENCY,
    # )
    # print(intent)
    # return render(request, 'home/checkout.html', context=order_context)    
    
    return render(request, 'home/order.html', context)

def commercial(request):
    """ View returns commercial customer page """
    return render(request, 'home/commercial.html')