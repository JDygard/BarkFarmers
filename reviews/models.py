from django.db import models
from profiles.models import UserProfile
from django.contrib.auth.models import User

# Create your models here.

class UserReview(models.Model):
    star_enumeration_choices = [(0),(1),(2),(3),(4),(5),(6),(7),(8),(9)]
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    stars = models.IntegerField(blank=False, null=True)
    review = models.TextField(blank=True, null=True)