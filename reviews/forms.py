from django import forms
from .models import UserReview

class UserReviewForm(forms.ModelForm):
    class Meta:
        model = UserReview
        exclude = ('user',)
    
    def __init__(self, *args, **kwargs):
        """ Set the integer input to hidden """
        super().__init__(*args, **kwargs)
        self.fields['review'].widget.attrs['autofocus'] = True
        self.fields["review"].widget.attrs['class'] = 'border-black rounded-0 review-form-input'
        self.fields["review"].label = False
        self.fields["stars"].label = False