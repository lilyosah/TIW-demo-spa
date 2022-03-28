import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const completeTodo = (e) => {
    const input = e.currentTarget;
    const id = input.id;
    const target = todos.filter((todo) => {
      return todo.id === id;
    })[0];
    target.completed = !target.completed;
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return target;
      } else {
        return todo;
      }
    });
    setTodos(updated);
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
  };

  const deleteTodo = (e) => {
    const id = e.currentTarget.id;
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (e) => {
    const target = todos.filter((todo) => {
      return todo.id === e.currentTarget.id;
    })[0];
    target.title = window.prompt("Update the title", target.title);
    target.description = window.prompt(
      "Update the description",
      target.description
    );
    if (target.title !== "" && target.description !== "") {
      setTodos(
        todos.map((todo) => {
          if (todo.id === target.id) {
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