from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^image_vision/$', views.image_vision, name='image_vision'),
    url(r'^$', views.HomeView.as_view(), name='home'),
]