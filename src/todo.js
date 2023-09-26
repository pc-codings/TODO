// src/Todo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Todo.css'

function Todo() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updatedTask, setUpdatedTask] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    // Load tasks from localStorage for the current user when the component mounts
    const username = localStorage.getItem('username');
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${username}`) || '[]');
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const username = localStorage.getItem('username');
      const taskObject = { text: newTask, priority };
      const updatedTasks = [...tasks, taskObject];
      setTasks(updatedTasks);
      setNewTask('');

      // Store tasks in localStorage with the user-specific key
      localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    }
  };

  const updateTask = (index) => {
    if (updatedTask.trim() !== '') {
      const username = localStorage.getItem('username');
      const updatedTasks = [...tasks];
      updatedTasks[index].text = updatedTask;
      updatedTasks[index].priority = priority;
      setTasks(updatedTasks);
      setUpdatedTask('');

      // Store updated tasks in localStorage with the user-specific key
      localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
    }
  };

  const removeTask = (index) => {
    const username = localStorage.getItem('username');
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Store updated tasks in localStorage with the user-specific key
    localStorage.setItem(`tasks_${username}`, JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage on logout
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <input
                type="text"
                value={updatedTask}
                onChange={(e) => setUpdatedTask(e.target.value)}
              />
              <div className="button">
              <button onClick={() => updateTask(index)}>Update</button>
              <button onClick={() => removeTask(index)}>Delete</button>
              </div>
              {task.text} (Priority: {task.priority}){' '}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Todo;
