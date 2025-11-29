import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../features/todos/todosSlice";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";

export default function Todos() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(s => s.todos);

  useEffect(()=>{
    if(status === "idle") dispatch(loadTodos());
  }, [status, dispatch]);

  return (
    <div className="todos-page">
      <header className="hero">
        <h1 className="title">Just do it.</h1>
        <ThemeToggle />
      </header>

      <main>
        <AddTodoForm />
        <TodoList todos={items} />
      </main>
    </div>
  );
}
