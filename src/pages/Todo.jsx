import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, deleteTodo, toggleComplete } from '../store/todoSlice';
import { Button, Input, List, Checkbox } from 'antd';

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({
        text,
        complete: false,
      }));
      setText('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (todo) => {
    dispatch(toggleComplete(todo));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter todos based on the search term

  return (
    <div>
      <h2>Todo List</h2>
      <Input
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Input
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={handleAddTodo}
      />
      <Button type="primary" onClick={handleAddTodo} style={{ marginTop: '10px' }}>
        Add Todo
      </Button>
      <List
        dataSource={filteredTodos} // Use filteredTodos instead of todos
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button danger onClick={() => handleDelete(todo.id)}>
                Delete
              </Button>,
            ]}
          >
            <Checkbox
              checked={todo.complete}
              onChange={() => handleToggleComplete(todo)}
            >
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todo;
