import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL // example: https://jsonplaceholder.typicode.com
});

export const fetchTodos = () => api.get("/todos");
export const createTodo = (todo) => api.post("/todos", todo);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

export const fetchUsers = () => api.get("/users");
