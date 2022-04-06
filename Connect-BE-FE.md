# Connecting the back-end and front-end

Steps:

1. Rename directories/folders for clarity
    - `todo-app/myproject` -> `todo-be` (get rid of the outer `myproject` folder, move everything in it directly to `todo-be`)
    - `todolist` -> `todo-fe`

2. Add these lines to [todo-be/myproject/settings.py](todo-be/myproject/settings.py)

    - At the top of the file: `import os`
    - Change `ALLOWED_HOSTS = []` to `ALLOWED_HOSTS = ['localhost', '127.0.0.1']` around line 28.
    - In the `MIDDLEWARE` list, move `'corsheaders.middleware.CorsMiddleware',` to the top of the list instead of at the bottom. This allows it to take preference over the other middleware.
    - Add the following lines to the bottom of the file:

        ```Python
        # Lets you host the back-end on any domain 
        CORS_ORIGIN_ALLOW_ALL = True

        # Specify static resources will come from this directory
        REACT_APP_DIR = os.path.join(BASE_DIR.parent, 'todo-fe')
        STATICFILES_DIRS = [
            os.path.join(REACT_APP_DIR, 'build', 'static'),
        ]
        ```

3. Add fixes for back-end methods

    Replace the two methods at the bottom of [todo-be/myproject/views.py](todo-be/myproject/views.py). These make sure the data is valid before saving it and return error responses when needed.

    ```Python
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
    ```

4. Add an API JavaScript object to access our back-end methods

    - Create a new file in `todo-fe/src` called `API.js`
    - Paste this code inside `API.js`

    ```JS
    import axios from "axios";

    const url = "http://localhost:8000/";

    export const API = {
        addTodo: (todoData) => {
            return axios.post(url, todoData);
        },

        getTodos: () => {
            return axios.get(url);
        },

        editTodo: (todoData) => {
            return axios.patch(url+todoData.id, todoData);
        },

        deleteTodo: (id) => {
            return axios.delete(url+id);
        }
    }
    ```

5. Add the following code to the top of [todo-fe/src/App.js](todo-fe/src/App.js)

    - Import our new file at the top by the other imports:
    `import { API } from "./API";`
    - Update the import from React, adding `useEffect`.
    `import { useState, useEffect } from "react";`
    - Insert this after the call to `useState` at the top. This will run when the component is first mounted and load in all of the tasks in the database to our state.

        ```JS
        useEffect(() => {
            const fetchTasks = async () => {
                setTodos((await API.getTodos()).data);
            }
            fetchTasks();
        }, [])
        ```

6. Update methods in [todo-fe/src/App.js](todo-fe/src/App.js) to utilize and connect to our back-end

    - `completeTodo`

        This adds a call to the back-end to also complete the task there, as well as some minor fixes.

        ```JS
        const completeTodo = (e) => {
            const input = e.currentTarget;
            const id = parseInt(input.id);
            const target = todos.filter((todo) => {
                return todo.id === id;
            })[0];
            API.editTodo(target);
            target.completed = !target.completed;
            const updated = todos.map((todo) => {
                if (todo.id === id) {
                    return target;
                } else {
                    return todo;
                }
            });
            setTodos(updated);
            // Update BE
            API.editTodo(target);
        };
        ```

    - `addTodo`

        This change will cause the task to be added to the back-end as well. The ID of the todo is generated by the back-end. Once we have this ID passed back from the BE, we can update our todo in the FE.

        ```JS
        const addTodo = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fields = form.elements;
            const title = fields["title"].value;
            const description = fields["description"].value;
            const newTodo = {
                title: title,
                description: description,
                completed: false,
            };
            form.reset();
            // Add the todo to the back-end to generate an ID for it
            const response = await API.addTodo(newTodo);
            if (response.status === 201 ) {
                // Add the ID the BE generated to our task in the FE
                newTodo.id = response.data.id;
                setTodos([newTodo].concat(todos));
            }
        };
        ```

    - `deleteTodo`

        Deletes the todo in the back-end as well

        ```JS
        const deleteTodo = (e) => {
            const id = parseInt(e.currentTarget.id);
            setTodos(todos.filter((todo) => todo.id !== id));
            API.deleteTodo(id);
        };
        ```

    - `editTodo`

        This fixes some small issues and adds a call to edit the todo in the back-end as well.

        ```JS
        const editTodo = (e) => {
            const target = todos.filter((todo) => {
            return todo.id === parseInt(e.currentTarget.id);
            })[0];
            const title = window.prompt("Update the title", target.title);
            const description = window.prompt(
            "Update the description",
            target.description
            );
            if ((title !== "" && title !== null) || (description !== "" && description !== null)) {
            setTodos(
                todos.map((todo) => {
                if (todo.id === parseInt(target.id)) {
                    if (title !== "" && title !== null) {
                        target.title = title;
                    }
                    if (description !== "" && description !== null) {
                        target.description = description;
                    }
                    // Update todo in back end
                    API.editTodo(target);
                    return target;
                } else {
                    return todo;
                }
                })
            );
            }
        };
        ```

7. Test our changes

    - Open TWO terminals. (Must be powershell in Windows)
    - In both, switch into your virtual environment.
        - To create a new one if needed: `$ python -m venv [virtual environment name]`

            Also try py and python3 if python does not work.

        - Windows: `$ [virtual environment name]/Scripts/activate.bat` or `$ [virtual environment name]/Scripts/activate`
        - Mac: `$ source [virtual environment name]/bin/activate`

    - In the terminal you designate as your back-end terminal, cd into the back-end. Install all dependencies, migrate, and launch the development server. If python does not work, try py and python3.

        ```Bash
        $ cd todo-be
        $ pip install -r requirements.txt
        $ python manage.py makemigrations
        $ python manage.py migrate
        $ python manage.py runserver
        ```

    - In the other terminal you designated as your front-end terminal, cd into the front-end. Install all dependencies and launch the development server.

        ```Bash
        $ cd todo-fe
        $ npm install axios --save
        $ npm install
        $ npm start
        ```

    - Navigate to http://localhost:3000/ in a browser. You should be able to add a task, refresh the page, and see the same task.

8. Serve built resources from back-end server url

    - Add the following lines to the top of [todo-be/myapp/views.py](todo-be/myapp/views.py) under the import statements already there. This will serve the built HTML/JS files at after you have built them using `$ npm run build`.

        ```Python
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
        ```

    - Update the urls in `todo-be/myproject/urls.py` to separate our API from our default home which will serve the front-end

        ```Python
        urlpatterns = [
            path('', views.serve_front_end, name='home'),
            path('todos/', include('myapp.urls')),
            path('admin/', admin.site.urls),
        ]
        ```

    - Update our API url in [todo-fe/src/API.js](todo-fe/src/API.js)

        `const url = "http://localhost:8000/todos/";`

    - Run `$ npm run build` in the front-end terminal.

        This will optimize and minify all of our React code for a production environment. The optimized build does not auto-reload, so you will need to re-run this command after you make changes to see them reflected. For this reason, it's better to develop using the development server (`$ npm start`)

9. Test our changes

    - Make sure the front-end server is running. The front-end server does NOT need to be running to see the optimized build.
    - Navigate to http://127.0.0.1:8000/ in a browser.
    - You should see the app.
