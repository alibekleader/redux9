import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Todo from './pages/Todo';
import Teachers from './pages/Teachers'; // Import Teachers component

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {isAuthenticated ? (
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="students" element={<Students />} />
          <Route path="todo" element={<Todo />} />
          <Route path="teachers" element={<Teachers />} /> {/* Add Teachers route */}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default App;
