
from django.contrib import admin
from django.urls import path, include
# DRF classes
from rest_framework import routers
from .views import UserViewSet


# DRF Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    # DRF urls
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    # django-allauth
    path('accounts/', include('allauth.urls')),

]
