from django.contrib import admin
from .models import UserReview



class ReviewAdmin(admin.ModelAdmin):
    fields = ("user", "stars", "review")

    
    list_display = ("user", "stars", "review")

admin.site.register(UserReview, ReviewAdmin)

