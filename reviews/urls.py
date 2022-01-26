from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.reviews, name='reviews'),
    path('submit_reviews/', views.submit_reviews, name='submit_reviews'),
]