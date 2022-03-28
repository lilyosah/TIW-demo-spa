# TIW-demo-spa

*This project assumes that you have Python and an IDE (ex. VSCode) of your choice already installed. [Install VSCode here](https://code.visualstudio.com/Download)*

Note: Type the commands in a terminal *without* the `$` symbol, this symbol indicates it should be typed on the command line.

## BACKEND: DJANGO SETUP

To set up your project, run either the steps to create one from scratch OR the instructions to set up the project already in this repository. The instructions to launch the server are the same for either after that point.

### To set up a new Django project from scratch

These steps will only need to be run once. Do not run these if you would like to use the project we have set-up.

Note: Try `pip3` if `pip` is not found. Try `python3` if `python` is not found.

1. Open a terminal.

2. Create a new project directory wherever you would like.

    `$ mkdir todo`

3. Navigate to the directory.

    `$ cd todo`

4. Install virtualenv using `pip` if you don't have it already. This will allow us to isolate our project from the rest of our computer.

    `$ pip install virtualenv`

5. Create a new virtual environment.

    `$ python -m venv djangoenv`

6. Activate the virtual environment. Note that you will need to activate the virtual environment every time you want to work on this project.

    **Mac/Linux:**

    `$ source djangoenv/bin/activate`

    **Windows:**
    Run the following script in Powershell, not cmd.

    `$ .\djangoenv\Scripts\activate`

    If it worked, you will see some sort of indicator or the environment name at the beginning of the line.

7. Install Django inside the virtual environment.

    `$ python -m pip install django`

8. Create a new Django project.

    `$ django-admin startproject myproject`

9. Navigate to the Django project.

    `$ cd myproject`

### To set up Django to run THIS project for the first time

These steps will only need to be run once.

Note: Try `pip3` if `pip` is not found. Try `python3` if `python` is not found.

1. Open a terminal.

2. Clone this directory wherever you would like.

    `$ git clone https://github.com/techimmersionweek22/Demo-To-Do-SPA.git`

3. Change directories into the new folder

    `$ cd Demo-To-Do-SPA`

4. Install virtualenv using `pip` if you don't have it already. This will allow us to isolate our project from the rest of our computer (so we don't have to worry about dependency conflicts between this and any other projects we have).

    `$ pip install virtualenv`

5. Create a new virtual environment for use with this project.
  
    `$ python -m venv SPADemo`

6. Activate the virtual environment. Note that you will need to activate the virtual environment every time you want to work on this project.

    **Mac/Linux:**

    `$ source SPADemo/bin/activate`

    **Windows:**
    Run the following script in Powershell, not cmd.

    `$ .\SPADemo\Scripts\activate`

    If it worked, you will see some sort of indicator or the environment name at the beginning of the line.

7. Install dependencies inside the virtual environment.

    `$ python -m pip install -r requirements.txt`

8. Navigate to the Django project.
    `$ cd todo-be`

### To start the development server

These steps will need to be run every time you work on the project.

1. Within the correct virtual environment and directory (run the steps to activate the env if it is not already activated and cd into your project folder (myproject)) apply any necessary migrations.

    `$ python manage.py migrate`

2. Start running the development server. Go to http://127.0.0.1:8000/ in a browser to view an interactive API.

    `$ python manage.py runserver`
