from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task

# Create your views here.
@api_view(['GET', 'POST'])
def tasks(request):
    # Get all tasks
    if request.method == 'GET':
        data = Task.objects.all()
        serializer = TaskSerializer(data, context={'request': request}, many=True) 
        return Response(serializer.data)
    # Create a new task
    elif request.method == 'POST':
        serializer = TaskSerializer(
            data = request.data
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PATCH'])
def task_details(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Get a specific task
    if request.method == 'GET':
        serializer = TaskSerializer(task, context={"request": request})
        return Response(serializer.data)
    # Delete a task
    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PATCH':
        # Update fields
        updated_data = request.data.copy()
        serializer = TaskSerializer( 
            task,
            data=updated_data, 
            partial=True)
        return Response(serializer.data)