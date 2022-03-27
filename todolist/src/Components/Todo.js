import React from "react";

export default function Todo({
  targetTodo,
  viewList,
  setViewList,
  editTodo,
  deleteTodo,
}) {
  return (
    <div className={viewList ? "invisible" : ""}>
      <h1 className="display-1 text-center">{targetTodo.title}</h1>
      <form onSubmit={editTodo}>
        <input type="hidden" name="id" value={targetTodo.id} />
        <label htmlFor="title">Title</label>
        <div className="input-group mb-3">
          <input
            name="title"
            type="text"
            className="form-control"
            defaultValue={targetTodo.title}
            row="1"
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            defaultValue={targetTodo.description}
            rows="3"
            name="description"
            required
          ></textarea>
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
        <br />
      </form>
      <div className="text-wrap">
        <p>{targetTodo.description}</p>
      </div>
      <div className="row">
        <div className="col-1">
          <button
            type="button"
            className="btn btn-primary"
            id="delete"
            onClick={() => {
              setViewList(true);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger"
            id={targetTodo.id}
            onClick={deleteTodo}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
