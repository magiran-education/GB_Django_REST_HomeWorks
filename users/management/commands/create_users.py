from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser('admin', '', 'admin', lastname='Админов', firstname='Админ')
        User.objects.create_user('andreysk', 'andreycu@mail.ru', '12345678', lastname='Купряхин', firstname='Андрей')
        User.objects.create_user('vasya', 'vasya@ya.ru', '87654321', lastname='Салимов', firstname='Василий')
