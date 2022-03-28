from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=120, help_text="Enter task title")
    description = models.TextField(help_text="Enter task description")
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title