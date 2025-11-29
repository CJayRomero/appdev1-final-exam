import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

export default function AddTodoForm(){
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if(!text.trim()) return;
    dispatch(addTodo({ title: text, completed: false }));
    setText("");
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <input placeholder="Add a task." value={text} onChange={e=>setText(e.target.value)} />
      <button type="submit">I Got This!</button>
    </form>
  );
}
