# TIW-demo-spa

*This project assumes that you have Python and an IDE (ex. VSCode) of your choice already installed. [Install VSCode here](https://code.visualstudio.com/Download)*

Note: Type the commands in a terminal *without* the `$` symbol, this symbol indicates it should be typed on the command line.

There are instructions to create a new app from scratch as well as instructions to use this demo app.

- [Using this app](#using-this-app)
  - [Back-End](#back-end-for-todolist-app---django)
  - [Front-End](#front-end-for-todolist-app---react)  
- [Creating your own from scratch](#creating-a-new-app-from-scratch)
  - [Back-End](#back-end-for-your-app---django)
  - [Front-End](#front-end-for-your-app---react)
  - [Connecting the back and front ends](#connecting-the-back-end-and-front-end)

## Using this app

### Back-end for todolist app - Django

These steps are used to get the database and API up and running.

#### Steps you only need to run once, when you first set up the project

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

7. Install Python dependencies inside the virtual environment.

    `$ python -m pip install -r requirements.txt`

8. Continue with the next instructions.

#### Steps you need to run every time you want to launch the back-end server (API)

1. If you are not already in the virtual environment, activate it.

    > Same code as in step 6 above!

2. Navigate to the Django project.

    `$ cd todo-be`

3. Apply any necessary migrations.

    `$ python manage.py migrate`

4. Start running the server. Go to http://127.0.0.1:8000/todos/ in a browser to view an interactive API.

    `$ python manage.py runserver`

### Front-end for todolist app - React

You can either launch the development server where things are not optimized but changes are live-reloaded, or build a production ready version of the app that can be seen at the back-end servers root url (http://127.0.0.1:8000/). This url will only show the app AFTER the steps to build the front-end app have been run.

#### Launching the development server

These steps are used to get the Create React App development server up and running.

1. Leave the back-end server running in a separate terminal. This will allow the front-end to access the live API.

2. In a NEW, SEPARATE terminal, cd into the front-end folder.

    `$ cd ./todo-fe`

3. Install Node dependencies.

    `$ npm install`

4. Run the development server.

    `$ npm start`

    If you place the terminals next to each other, it should look something like this. The back-end server is running on the left, and the front-end development server is running on the right.

    ![Two open terminals next to each other. The left ends with "Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK." The right ends with "webpack 5.70.0 compiled successfully in 13639 ms"](serversRunning.png)

#### Building and viewing the production-ready app

1. Move into the front-end directory.

    `$ cd ./todo-fe`

2. Install Node dependencies.

    `$ npm install`

3. Build the production ready app into todo-fe/build

    `$ npm run build`

4. Run the steps to start the back end server [above](#steps-you-need-to-run-every-time-you-want-to-launch-the-back-end-server-api).

5. Navigate to http://127.0.0.1:8000/ in a browser to see the built app.

## Creating a new app from scratch

### Back-end for your app - Django

Note: Try `pip3` if `pip` is not found. Try `python3` if `python` is not found.

#### Steps you only need to run once, when you first create the project

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

9. Continue with the next section to launch the API.

#### Steps you need to run every time you want to launch the back-end server (API)

1. Navigate to the Django project.

    `$ cd myproject`

2. If you are not already in the virtual environment, activate it.

    > Same code as in step 6 above!

3. Apply any necessary migrations.

    `$ python manage.py migrate`

4. Start running the development server. Go to http://127.0.0.1:8000/ in a browser to view an interactive API.

    `$ python manage.py runserver`

### Front-end for your app - React

### Connecting the back-end and front-end