# djoser classes
from djoser.serializers import UserCreateSerializer
# Models
from django.contrib.auth import get_user_model
User = get_user_model()




class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'name', 'password']