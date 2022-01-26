from django.shortcuts import render

# Create your views here.
def reviews(request):
    template = "reviews/reviews.html"
    context = {}

    return render(request, template, context)

def submit_reviews(request):
    print(request)
    template = "reviews.html"
    context = {}
    return render(request, template, context)
