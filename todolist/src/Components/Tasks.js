import React from "react";

export default function Tasks({ objects, updateTask, removeTask }) {
  return (
    <ul className="list-group">
      {objects.map((item) => (
        <li className="list-group-item hover-list" key={item.id}>
          <div className="row">
            <div className={window.innerWidth > 600 ? "col-10" : "col-8"}>
              <div className="d-flex justify-content-center">
                <p className="text-center">{item.name}</p>
              </div>
            </div>
            <div className={window.innerWidth > 600 ? "col-1" : "col-2"}>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-success"
                  id={item.id}
                  onClick={updateTask}
                >
                  <i className="bi bi-pencil"></i>
                </button>
              </div>
            </div>
            <div className={window.innerWidth > 600 ? "col-1" : "col-2"}>
              <div className="d-flex justify-content-start">
                <button
                  type="button"
                  className="btn btn-danger"
                  id={item.id}
                  onClick={removeTask}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
