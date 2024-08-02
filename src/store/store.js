import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import studentReducer from './studentSlice';
import todoReducer from './todoSlice';
import teacherReducer from './teacherSlice'; // Import the teacher slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    todos: todoReducer,
    teachers: teacherReducer, // Add the teacher slice to the store
  },
});

export default store;
