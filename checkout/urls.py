from django.contrib import admin
from django.urls import path
from . import views
from .webhooks import webhooks

urlpatterns = [
    path('checkout/', views.checkout, name='checkout'),
    path('checkout_success/<order_number>', views.checkout_success, name='checkout_success'),
    path('checkout_fail/', views.checkout_fail, name='checkout_fail'),
    path('wh/', webhooks, name='webhook')
]