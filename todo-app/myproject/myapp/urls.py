from django.urls import path
from . import views

urlpatterns = [
    path('', views.tasks, name='tasks'),
    path('<int:id>', views.task_details, name='task-detail'),
]