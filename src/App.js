import React from 'react';
import { Router, Route, Routes, Navigate } from 'react-router-dom';
import Todo from './todo';
import Auth from './Auth';
import './App.css';

function App() {
  return (
  
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    
  );
}

export default App;
