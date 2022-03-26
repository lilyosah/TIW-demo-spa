# TIW-demo-spa

## DJANGO SETUP
Note: Try `pip3` if `pip` is not found. Try `python3` if `python` is not found.
1. Open terminal.
2. Create a new project directory wherever you would like.
`$ mkdir todo-app`
3. Navigate to the directory.
`$ cd todo-app`
4. Install virtualenv using `pip` if you don't have it already. This will allow us to isolate our project from the rest of our computer.
`$ pip install virtualenv`
5. Create a new virtual environment.
`$ python -m venv djangoenv`
6. Activate the virtual environment. Note that you will need to activate the virtual environment every time you want to work on this project. 
`$ source djangoenv/bin/activate`
7. Install Django inside the virtual environment.
`$ python -m pip install Django`
8. Create a new Django project.
`$ django-admin startproject myproject`
9. Navigate to the Django project.
`$ cd myproject`
9. Start running the development server. Go to http://127.0.0.1:8000/ to see it.
`$ python manage.py runserver`
10. Apply any necessary migrations.
`$ python manage.py migrate`
