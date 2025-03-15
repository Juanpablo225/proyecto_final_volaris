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

def RECOVERY(request):
    return render(request, 'mi_app/Recovery.html')
#################################################################################################
def HOME_ADMIN(request):
    return render(request,'mi_app/HOME_ADMIN.html')


def HOME_USER(request):
    return render(request,'mi_app/HOME_USER.html')
##################################################################################################
def SEARCH_ADMIN(request):
    return render(request, 'mi_app/SEARCH_ADMIN.html')

def SEARCH_USER(request):
    return render(request, 'mi_app/SEARCH_USER.html')
#################################################################################################
def UPLOAD_ADMIN(request):
    return render(request, 'mi_app/UPLOAD_ADMIN.html')

def UPLOAD_USER(request):
    return render(request, 'mi_app/UPLOAD_USER.html')
##################################################################################################