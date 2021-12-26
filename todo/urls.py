from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as token_views
from users.views import UserModelViewSet
from projects.views import ProjectModelViewSet, ToDoModelViewSet


router = DefaultRouter()
router.register('users', UserModelViewSet, basename='users')
router.register('projects', ProjectModelViewSet, basename='projects')
router.register('todo', ToDoModelViewSet, basename='todo')

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-token-auth/', token_views.obtain_auth_token),
]
