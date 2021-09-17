from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('static/', views.index),
    path('order/', views.order, name="order")
]
