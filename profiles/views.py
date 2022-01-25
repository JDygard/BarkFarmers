from django.shortcuts import get_object_or_404, render, redirect, reverse
from .models import UserProfile
from django.contrib import messages
from checkout.models import Order
from .forms import UserProfileForm


def profile(request):
    
    """ Display profile """
    profile = get_object_or_404(UserProfile, user=request.user)

    form = UserProfileForm(instance=profile)
    orders = profile.orders.all()


    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully')
            return redirect(reverse('profile',))
            
    template = 'profiles/profile.html'
    context = {
        'profile': profile,
        'orders': orders,
        'form': form
    }

    return render(request, template, context)

def order_history(request, order_number):
    order = get_object_or_404(Order, order_number=order_number)

    template = 'checkout_success.html'
    context = {
        'order': order,
        'from_profile': True,
    }

    return render(request, template, context)