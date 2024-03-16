from django.urls import path
from . import views

urlpatterns = [
 path("register", views.register),
 path("login", views.userlogin),
 path("csrftoken", views.get_csfr_token),
 path("getinfo", views.getuserinformation),
 path("logout", views.userlogout),
 path("getemail", views.getusersemail),
 path("getallusers", views.getallusers),
 path("getbioinfo/<slug:slug>", views.get_bio_info),
 path("changebio", views.change_bio),
 path("uploadavatar", views.upload_avatar)
]