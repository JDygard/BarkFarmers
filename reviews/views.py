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
    existing_review = None
    profile = get_object_or_404(UserProfile, user=request.user)
    existing_review = UserReview.objects.filter(user=profile).first()
    print(existing_review)
    if not existing_review:
        print("no review in db")
        existing_review = None

    if request.method == 'POST':
        if existing_review == None:
            form = UserReviewForm(request.POST)
            if form.is_valid():
                review = form.save(commit=False)
                review.user = profile
                form.save()
                messages.success(request, 'Review submitted successfully')
            else:
                messages.error(request, 'Submit failed.')
        else: 
            form = UserReviewForm(request.POST, instance=existing_review)
            if form.is_valid():
                review = form.save(commit=False)
                review.user = profile
                review.review = request.POST.get("review")
                review.stars = request.POST.get("stars")
                form.save()

            messages.success(request, 'Review submitted successfully')


    return redirect(reverse(reviews))