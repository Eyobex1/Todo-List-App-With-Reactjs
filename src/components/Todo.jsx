import { useEffect, useRef, useState } from "react";
import "./CSS/Todo.css";
import { Todoitems } from "./Todoitems";

let count = 0;
export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    const value = inputRef.current.value.trim();
    if (value === "") return;

    setTodos([...todos, { no: count++, text: value, display: "" }]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">
        <span className="eyob">Eyob</span> To-DO List
      </div>
      <div className="todo-add">
        <input
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
          ref={inputRef}
        />
        <div
          className="todo-add-btn"
          onClick={() => {
            add();
          }}
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => {
          return (
            <Todoitems
              key={index}
              setTodos={setTodos}
              no={todo.no}
              display={todo.display}
              text={todo.text}
            />
          );
        })}
      </div>
    </div>
  );
};
