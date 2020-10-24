# DRF classes
from rest_framework import viewsets
# Serializers from serializers.py
from .serializers import UserSerializer
# Models
from django.contrib.auth.models import User




# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer