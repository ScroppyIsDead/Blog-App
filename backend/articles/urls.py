from django.urls import path
from . import views

urlpatterns = [
    path("create", views.create_article),
    path("getownarticles", views.get_own_articles),
    path("delete", views.article_delete),
    path("allarticles", views.get_all_articles),
    path("slugged/<slug:slug>", views.get_article_from_slug)
]