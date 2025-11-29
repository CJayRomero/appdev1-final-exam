import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, removeTodo } from "../features/todos/todosSlice";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(todo.title);

  const handleComplete = () => {
    dispatch(editTodo({ id: todo.id, data: { ...todo, completed: !todo.completed } }));
  };

  const handleSave = () => {
    if (!updatedText.trim()) return;
    dispatch(editTodo({ id: todo.id, data: { ...todo, title: updatedText } }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          className="edit-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            opacity: todo.completed ? 0.6 : 1
          }}
        >
          {todo.title}
        </span>
      )}

      {/* Complete button */}
      <button className="todo-btn" onClick={handleComplete}>
        ✓
      </button>

      {/* Edit or Save */}
      {isEditing ? (
        <button className="todo-btn" onClick={handleSave}>
          💾
        </button>
      ) : (
        <button className="todo-btn" onClick={() => setIsEditing(true)}>
          ✎
        </button>
      )}

      {/* Delete */}
      <button className="todo-btn" onClick={handleDelete}>
        🗑️
      </button>
    </div>
  );
}
