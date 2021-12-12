from django_filters import rest_framework as filters
from projects.models import ToDo


class ToDoFilter(filters.FilterSet):
    project = filters.NumberFilter()

    class Meta:
        model = ToDo
        fields = ['project']
