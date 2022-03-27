import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  localStorage.clear();
  [
    {
      title: "orci luctus",
      description: "Sed vel enim sit amet nunc viverra dapibus.",
      completed: true,
    },
    {
      title: "condimentum",
      description:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      completed: false,
    },
    {
      title: "diam erat",
      description:
        "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
      completed: true,
    },
    {
      title: "volutpat in",
      description:
        "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
      completed: true,
    },
    {
      title: "ut blandit",
      description:
        "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
      completed: false,
    },
    {
      title: "hendrerit",
      description:
        "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
      completed: false,
    },
    {
      title: "eu",
      description:
        "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      completed: true,
    },
    {
      title: "odio porttitor",
      description:
        "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
      completed: false,
    },
    {
      title: "ante",
      description:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
      completed: true,
    },
    {
      title: "ante",
      description:
        "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
      completed: false,
    },
  ].forEach((todo) => {
    localStorage.setItem(uuidv4(), JSON.stringify(todo));
  });
  console.log(
    Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    )
  );
  const [todos, setTodos] = useState([]);
  const addTodo = (e) => {
    e.preventDefault();
    const fields = e.currentTarget.elements;
    const id = uuidv4();
    const title = fields["title"].value;
    const description = fields["description"].value;
    const newTodo = {
      id: id,
      title: title,
      description: description,
      completed: false,
    };
    setTodos(todos.concat(newTodo));
  };
  const completeTodo = (e) => {
    const input = e.currentTarget;
    const li = input.parentNode.parentNode.parentNode;
    const id = li.id;
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
  return (
    <div id="App" className="container">
      <div className="row">
        <div className="col-11">
          <h1 className="display-1 text-center">My Todos</h1>
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
            {todos.map((todo) => (
              <li className="list-group-item" key={todo.id} id={todo.id}>
                <div className="row">
                  <div className="col-11">
                    <h3 className="text-center">
                      {todo.completed ? <s>{todo.title}</s> : todo.title}
                    </h3>
                  </div>
                  <div className="form-check col-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={todo.completed}
                      onChange={completeTodo}
                    ></input>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
