from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import redirect

from django.shortcuts import render

# mi_app/views.py
# mi_app/views.py

from django.shortcuts import render

def login_view(request):
    return render(request, 'mi_app/login.html')  # Asegúrate de que la plantilla esté en 'mi_app/login.html'
