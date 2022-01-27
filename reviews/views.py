from django.shortcuts import render, get_object_or_404, redirect, reverse
from .forms import UserReviewForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import UserReview
from profiles.models import UserProfile
from django.contrib import auth
from django.contrib.auth.models import User

# Create your views here.
def reviews(request):
    template = "reviews/reviews.html"
    form = UserReviewForm()
    entries = UserReview.objects.all()
    context = {
        "form": form,
        "entries": entries,
    }
    return render(request, template, context)

@login_required
def submit_reviews(request):
    profile = get_object_or_404(UserProfile, user=request.user)

    if request.method == 'POST':
        form = UserReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = profile
            form.save()
            messages.success(request, 'Review submitted successfully')
        else:
            messages.error(request, 'Submit failed.')

    return redirect(reverse(reviews))