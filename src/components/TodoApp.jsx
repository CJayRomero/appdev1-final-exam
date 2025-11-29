import React, { useEffect, useState, useRef } from "react";
import "../styles/todo.css"; // your CSS
import "../styles/corner.css";

export default function TodoApp() {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const [savedTheme, setSavedTheme] = useState(
    localStorage.getItem("savedTheme") || "standard"
  );

  // load todos from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("todos");
    if (raw) setTodos(JSON.parse(raw));
  }, []);

  // set theme on mount and when savedTheme changes
  useEffect(() => {
    document.body.className = savedTheme;
    if (savedTheme === "darker") {
      document.getElementById("title")?.classList.add("darker-title");
    } else {
      document.getElementById("title")?.classList.remove("darker-title");
    }
    // update classes on existing todo items (for page refresh)
    // but React will render proper classes below
    localStorage.setItem("savedTheme", savedTheme);
  }, [savedTheme]);

  // update localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addToDo(e) {
    e.preventDefault();
    const val = inputRef.current.value.trim();
    if (!val) {
      alert("You must write something!");
      return;
    }
    const todoObj = { text: val, completed: false };
    setTodos((prev) => [...prev, todoObj]);
    inputRef.current.value = "";
  }

  function removeTodoAt(index) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleComplete(index) {
    setTodos((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
  }

  // small helper to compute class names per theme
  const todoClass = (t) => `todo ${savedTheme}-todo ${t.completed ? "completed" : ""}`;
  const buttonClass = (base) => `${base} ${savedTheme}-button`;

  // time content
  const [dateString, setDateString] = useState(new Date().toLocaleString());
  useEffect(() => {
    setDateString(new Date().toLocaleString());
    // optional: update every minute
    const id = setInterval(() => setDateString(new Date().toLocaleString()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <header id="header">
        <div className="flexrow-container">
          <div className="theme-selector standard-theme" onClick={() => setSavedTheme("standard")} />
          <div className="theme-selector light-theme" onClick={() => setSavedTheme("light")} />
          <div className="theme-selector darker-theme" onClick={() => setSavedTheme("darker")} />
        </div>
        <div id="title">Just do it.</div>
      </header>

      <section id="form">
        <form onSubmit={addToDo}>
          <input ref={inputRef} className={`${savedTheme}-input`} placeholder="Add a new task..." />
          <button type="submit" className={`${savedTheme}-button todo-btn`}>Add</button>
        </form>
      </section>

      <section id="datetime">{dateString}</section>

      <section id="myUnOrdList">
        <div className="todo-list">
          {todos.length === 0 ? (
            <p style={{ opacity: 0.7, textAlign: "center", width: "100%" }}>No tasks yet. Add one above.</p>
          ) : (
            todos.map((t, i) => (
              <div key={i} className={todoClass(t)}>
                <li className="todo-item">{t.text}</li>
                <button className={buttonClass("check-btn")} onClick={() => toggleComplete(i)}>
                  <i className="fa fa-check" aria-hidden="true" />
                </button>
                <button className={buttonClass("delete-btn")} onClick={() => removeTodoAt(i)}>
                  <i className="fa fa-trash" aria-hidden="true" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
