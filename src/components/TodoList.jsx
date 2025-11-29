import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No tasks yet. Add one above.</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
}
