from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from users.models import User
from users.serializers import UserModelSerializer
from users.paginations import UserPageNumberPagination, UserLimitOffsetPagination


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # pagination_class = UserPageNumberPagination
    pagination_class = UserLimitOffsetPagination
    allowed_methods = ['GET', 'PATCH']
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
