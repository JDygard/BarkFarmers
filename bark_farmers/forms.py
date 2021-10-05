from django import forms

class ContactForm(forms.ModelForm):
    dick_out = forms.CharField(max_length=255)