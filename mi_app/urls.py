# mi_app/urls.py
from django.urls import path
from . import views

# mi_app/urls.py
# mi_app/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),  # Define el login para la raíz de mi_app
    path('RECOVERY/', views.RECOVERY, name='RECOVERY'),
]
