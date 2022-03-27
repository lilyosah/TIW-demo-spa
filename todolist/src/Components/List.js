import React from "react";

export default function List({
  todos,
  viewList,
  viewTodo,
  completeTodo,
  addTodo,
}) {
  return (
    <div className={viewList ? "" : "invisible"}>
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
              <div className="col-11 text-center">
                <button className="btn btn-link text-decoration-none">
                  <h3 onClick={viewTodo}>
                    {todo.completed ? <s>{todo.title}</s> : todo.title}
                  </h3>
                </button>
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
  );
}
