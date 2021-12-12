from datetime import datetime
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import ValidationError
from projects.models import Project, ToDo
from projects.filters import ToDoFilter
from projects.serializers import ProjectModelSerializer, ToDoModelSerializer
from projects.paginations import ProjectPageNumberPagination, ToDoPageNumberPagination


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPageNumberPagination

    def get_queryset(self):
        """Фильтрация по имени проекта.
        Пример (ищу проекты с "learn" в названии):
        http://127.0.0.1:8000/api/projects/?name=learn"""
        name = self.request.query_params.get('name', '')
        if name:
            return self.queryset.filter(name__contains=name)
        return self.queryset


class ToDoModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPageNumberPagination
    filterset_class = ToDoFilter

    # model_time_filter = "%Y-%m-%dT%H:%M:%S.%fZ"
    api_time_filter = "%Y-%m-%d"

    def get_queryset(self):
        """Фильтрация по дате создания заметки.
        Было интересно сделать без django-filter.
        Сделал фильтр между 2 датами.
        Пример (ищу заметки после 7дек, но до 15дек):
        http://127.0.0.1:8000/api/todo/?start_at=2021-12-07&end_at=2021-12-15"""
        start_at = self.request.query_params.get('start_at', '')
        end_at = self.request.query_params.get('end_at', '')
        if start_at and end_at:
            try:
                start_at = datetime.strptime(start_at, self.api_time_filter)
                end_at = datetime.strptime(end_at, self.api_time_filter)
            except ValueError:
                raise ValidationError('API date format error. Correct format is "%Y-%m-%d"')
            return self.queryset.filter(created_at__gte=start_at, created_at__lte=end_at)
        return self.queryset

    def perform_destroy(self, instance):
        """Статус CLOSED вместо удаления"""
        instance.status = ToDo.CLOSED
        instance.save(update_fields=['status'])
