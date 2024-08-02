import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// JSON server URL
const API_URL = 'http://localhost:3000/todos';

// Async Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleComplete = createAsyncThunk('todos/toggleComplete', async (todo) => {
  const updatedTodo = { ...todo, complete: !todo.complete };
  const response = await axios.put(`${API_URL}/${todo.id}`, updatedTodo);
  return response.data;
});

// Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        state[index] = action.payload;
      });
  },
});

export default todoSlice.reducer;
