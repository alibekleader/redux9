// src/store/teacherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/teachers';

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTeacher = createAsyncThunk('teachers/addTeacher', async (teacher) => {
  const response = await axios.post(API_URL, teacher);
  return response.data;
});

export const updateTeacher = createAsyncThunk('teachers/updateTeacher', async (teacher) => {
  const response = await axios.put(`${API_URL}/${teacher.id}`, teacher);
  return response.data;
});

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const teacherSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(teacher => teacher.id === action.payload.id);
        state.teachers[index] = action.payload;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(teacher => teacher.id !== action.payload);
      });
  },
});

export default teacherSlice.reducer;
