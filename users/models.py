from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(verbose_name='Логин', max_length=64, unique=True)
    firstname = models.CharField(verbose_name='Имя', max_length=64)
    lastname = models.CharField(verbose_name='Фамилия', max_length=64)
    email = models.EmailField(verbose_name='Почтовый ящик', max_length=64, unique=True)

    def __str__(self):
        return f'{self.lastname} {self.firstname} ({self.email})'
