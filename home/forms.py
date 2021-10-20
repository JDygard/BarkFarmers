from django import forms
from .models import Customer

class HardwoodOrder(forms.ModelForm):
    class Meta:
        fields = [
            'name',
            'email',
            'address_one',
            'address_two',
            'city',
            'state',
            'zip',
            'phone',
        ]
        model = Customer
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'Name'
            }),
            'email': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'E-mail'
            }),
            'address_one': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'Address'
            }),
            'address_two': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'Address'
            }),
            'city': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'City'
            }),
            'state': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'State'
            }),
            'zip': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'Zip'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'order-form',
                'placeholder': 'Phone'
            }),
        }
    packaging = forms.CharField(label="Packaging", max_length=255)
    amount = forms.CharField(label="Amount", max_length=255)
    
