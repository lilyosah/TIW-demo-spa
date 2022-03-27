import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "orci luctus",
      description: "Sed vel enim sit amet nunc viverra dapibus.",
      completed: true,
    },
    {
      id: 2,
      title: "condimentum",
      description:
        "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      completed: false,
    },
    {
      id: 3,
      title: "diam erat",
      description:
        "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
      completed: true,
    },
    {
      id: 4,
      title: "volutpat in",
      description:
        "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.",
      completed: true,
    },
    {
      id: 5,
      title: "ut blandit",
      description:
        "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.",
      completed: false,
    },
    {
      id: 6,
      title: "hendrerit",
      description:
        "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.",
      completed: false,
    },
    {
      id: 7,
      title: "eu",
      description:
        "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
      completed: true,
    },
    {
      id: 8,
      title: "odio porttitor",
      description:
        "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
      completed: false,
    },
    {
      id: 9,
      title: "ante",
      description:
        "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
      completed: true,
    },
    {
      id: 10,
      title: "ante",
      description:
        "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
      completed: false,
    },
  ]);
  const completeTodo = (e) => {
    const input = e.currentTarget;
    const li = input.parentNode.parentNode.parentNode;
    const id = parseInt(li.id);
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
