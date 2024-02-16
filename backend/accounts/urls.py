from django.urls import path
from . import views

urlpatterns = [
 path("register", views.register),
 path("login", views.userlogin),
 path("csrftoken", views.get_csfr_token),
 path("getinfo", views.getuserinformation),
 path("logout", views.userlogout),
]