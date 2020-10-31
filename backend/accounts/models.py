from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

# This is used to create a user. This is where you define the functions to do so
class UserAccountManager(BaseUserManager):

    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        # Normalizing the email means it turns Jacob.Dlugosz@gmail.com to jacob.dlugosz@gmail.com
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        # set_password just takes the normal text password and hashes it for security
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        # Normalizing the email means it turns Jacob.Dlugosz@gmail.com to jacob.dlugosz@gmail.com
        email = self.normalize_email(email)
        user = self.model(email=email, name=name,)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        # set_password just takes the normal text password and hashes it for security
        user.set_password(password)
        user.save()

        return user




class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    objects =  UserAccountManager()

    # Determines what the default login is. Usually it is username
    USERNAME_FIELD = 'email'
    # You can add additional required fields for example phone number
    REQUIRED_FIELDS = ['name']


    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name    

    # This is a string representation of this object
    def __str__(self):
        return self.email