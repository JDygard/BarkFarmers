from django.db import models
from profiles.models import UserProfile

# Create your models here.

class UserReview(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    stars = models.IntegerField(blank=False, null=True)
    review = models.TextField(blank=True, null=True)