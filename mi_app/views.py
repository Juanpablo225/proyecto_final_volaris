from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import redirect

from django.shortcuts import render

# mi_app/views.py
# mi_app/views.py

from django.shortcuts import render, redirect
from django.contrib import messages

# Ruta de los archivos
ADMIN_FILE = "mi_app/static/TXT/ADMIN.txt"
USER_FILE = "mi_app/static/TXT/USER.txt"


def index(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        # Verificar si es admin
        if validar_usuario(username, password, ADMIN_FILE):
            return redirect("HOME_ADMIN")  # Redirige a la página de admin

        # Verificar si es usuario normal
        elif validar_usuario(username, password, USER_FILE):
            return redirect("HOME_USER")  # Redirige a la página de usuario

        else:
            # Si no se encuentra el usuario, mostrar el mensaje de error
            messages.error(request, "Usuario o contraseña incorrectos")

    return render(request, "mi_app/index.html")


def validar_usuario(username, password, file_path):
    try:
        with open(file_path, "r") as file:
            for line in file:
                user, passw = line.strip().split(",")
                if user == username and passw == password:
                    return True
    except FileNotFoundError:
        print(f"El archivo {file_path} no existe")
    return False



















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
def Editar_Cuentas(request):
    return render(request,'mi_app/Editar_Cuentas.html')
###################################################################################################