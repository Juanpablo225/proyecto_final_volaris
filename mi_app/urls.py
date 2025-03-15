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
  ###########################################################################################
    path('HOME_ADMIN/', views.HOME_ADMIN, name='HOME_ADMIN'),
    path('HOME_USER/', views.HOME_USER, name='HOME_USER'),

   #######################################################################################

    path('SEARCH_ADMIN/', views.SEARCH_ADMIN, name='SEARCH_ADMIN'),
    path('SEARCH_USER/', views.SEARCH_USER, name='SEARCH_USER'),

    ###########################################################################################3

    path('UPLOAD_ADMIN/', views.UPLOAD_ADMIN, name='UPLOAD_ADMIN'),
    path('UPLOAD_USER/', views.UPLOAD_USER, name='UPLOAD_USER'),

  #############################################################################################


]
