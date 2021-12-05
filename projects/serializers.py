from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from rest_framework.relations import StringRelatedField
from projects.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)
    # users = StringRelatedField(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    created_user = StringRelatedField()
    project = StringRelatedField()
    class Meta:
        model = ToDo
        fields = '__all__'
