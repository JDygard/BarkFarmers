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
    print(entries)
    context = {
        "form": form,
        "entries": entries,
    }
    return render(request, template, context)

@login_required
def submit_reviews(request):
    profile = get_object_or_404(UserProfile, user=request.user)

    if request.method == 'POST':
        print(profile)
        # form_data = {
        #     'stars': request.POST.get('stars'),
        #     'review': request.POST.get('review'),
        #     'user': profile,
        # }
        form = UserReviewForm(request.POST)
        print(form)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = profile
            print("success")
            form.save()
            messages.success(request, 'Review submitted successfully')
            print("success")
        else:
            messages.error(request, 'Submit failed.')
            print("FAILURE")

    return redirect(reverse(reviews))