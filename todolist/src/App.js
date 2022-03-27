import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import List from "./Components/List";
import Todo from "./Components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [viewList, setViewList] = useState(true);
  const [targetTodo, setTargetTodo] = useState({});

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

  const editTodo = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = form.elements;
    const id = fields["id"].value;
    const title = fields["title"].value;
    const description = fields["description"].value;
    const updatedTodo = {
      id: id,
      title: title,
      description: description,
      completed: false,
    };
    setTodos(
      todos.map((todo) => {
        if (id === todo.id) {
          return updatedTodo;
        } else {
          return todo;
        }
      })
    );
    form.reset();
    setViewList(true);
  };

  const deleteTodo = (e) => {
    const id = e.currentTarget.id;
    setTodos(todos.filter((todo) => todo.id !== id));
    setViewList(true);
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

  const viewTodo = (e) => {
    const h3 = e.currentTarget;
    const li = h3.parentNode.parentNode.parentNode.parentNode;
    const id = li.id;
    const target = todos.filter((todo) => {
      return todo.id === id;
    })[0];
    setTargetTodo(target);
    setViewList(false);
  };

  return (
    <div id="App" className="container">
      <List
        todos={todos}
        viewList={viewList}
        viewTodo={viewTodo}
        addTodo={addTodo}
        completeTodo={completeTodo}
      ></List>
      <Todo
        targetTodo={targetTodo}
        viewList={viewList}
        setViewList={setViewList}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      ></Todo>
    </div>
  );
}

export default App;
