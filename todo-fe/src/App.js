import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { API } from "./API";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setTodos((await API.getTodos()).data);
    }
    fetchTasks();
  }, [])
    
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
    API.editTodo(target);
  };

  const addTodo = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = form.elements;
    const id = uuidv4();
    const title = fields["title"].value;
    const description = fields["description"].value;
    const newTodo = {
      id: id,
      title: title,
      description: description,
      completed: false,
    };
    form.reset();
    setTodos([newTodo].concat(todos));
    API.addTodo(newTodo);
  };

  const deleteTodo = (e) => {
    const id = parseInt(e.currentTarget.id);
    setTodos(todos.filter((todo) => todo.id !== id));
    API.deleteTodo(id);
  };

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
            API.editTodo(target);
            return target;
          } else {
            return todo;
          }
        })
      );
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center display-1">My Todos</h1>

        <form onSubmit={addTodo}>
          <label htmlFor="title">Title</label>
          <div className="input-group mb-3">
            <input
              name="title"
              type="text"
              className="form-control"
              row="1"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              required
            ></textarea>
          </div>
          <br />
          <div>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
          <br />
        </form>

        <ul className="list-group">
          {todos.map((todo) => {
            return (
              <li className="list-group-item" key={todo.id} id={todo.id}>
                <div className="row">
                  <div className="col-11 text-center">
                    <h3>
                      {" "}
                      {todo.completed ? <s>{todo.title}</s> : todo.title}
                    </h3>
                  </div>
                  <div className="col-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={todo.id}
                      checked={todo.completed}
                      onChange={completeTodo}
                    ></input>
                  </div>
                </div>
                <div className="text-wrap">
                  <p>{todo.description}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  id={todo.id}
                  onClick={editTodo}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  id={todo.id}
                  onClick={deleteTodo}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;