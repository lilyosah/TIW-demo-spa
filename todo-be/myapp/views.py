from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import TaskSerializer
from .models import Task

# Added for pt 3
import os
from django.http import HttpResponse
from django.conf import settings
import logging

# Create your views here.
def serve_front_end(request):
    """
    Serves the compiled frontend entry point (only works if you have run `npm
    run build`).
    """
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        logging.exception('Production build of app not found')
        return HttpResponse(
            """
            This URL is only used when you have built the production
            version of the app. Visit http://localhost:3000/ instead, or
            run `npm run build` to test the production version.
            """,
            status=501,
        )

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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                "errors": serializer.errors})


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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={
                "errors": serializer.errors})