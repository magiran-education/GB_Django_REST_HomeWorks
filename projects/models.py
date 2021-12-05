from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название', max_length=128)
    repository = models.URLField(verbose_name='Репозиторий', blank=True)
    users = models.ManyToManyField(User, verbose_name='Участники')

    def __str__(self):
        if self.repository:
            return f'{self.name} ({self.repository})'
        return self.name


class ToDo(models.Model):
    ACTIVE = 'Active'
    CLOSED = 'Closed'
    STATUS = [
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
    ]

    project = models.ForeignKey(Project, verbose_name='Проект', on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст', max_length=1024)
    created_at = models.DateTimeField(verbose_name='Создана', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='Обновлена', auto_now=True)
    created_user = models.ForeignKey(User, verbose_name='Создавший пользователь', on_delete=models.PROTECT)
    status = models.CharField(verbose_name='Статус', choices=STATUS, default=ACTIVE, max_length=6)

    def __str__(self):
        return f'{self.project.name[:30]} ({self.text[:47]})'
