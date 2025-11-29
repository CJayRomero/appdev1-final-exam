import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./todosAPI";

// Async thunks
export const loadTodos = createAsyncThunk("todos/load", async () => {
  const res = await api.fetchTodos();
  return res.data.slice(0, 10); // limit to 10 for demo
});

export const addTodo = createAsyncThunk("todos/add", async (payload) => {
  const res = await api.createTodo(payload);
  return res.data;
});

export const editTodo = createAsyncThunk("todos/edit", async ({ id, data }) => {
  const res = await api.updateTodo(id, data);
  return res.data;
});

export const removeTodo = createAsyncThunk("todos/remove", async (id) => {
  await api.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    // local-only changes (optional)
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => { state.status = "loading"; })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      });
  }
});

export default todosSlice.reducer;
