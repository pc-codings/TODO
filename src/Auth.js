// src/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Auth.css'

const Auth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if the user is already registered
  const isUserRegistered = localStorage.getItem('isRegistered') === 'true';

  const handleLogout = () => {
    // Clear user-related data from localStorage on logout
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleLogin = () => {
    if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);

      // Navigate to the /todo route after successful login
      navigate('/todo');
    } else {
      // Display an alert and set isRegistered to true to show the registration form
      alert('Invalid login credentials. You will be redirected to the registration page.');
      setIsRegistered(true);
    }
  };

  const handleRegister = () => {
    if (username && password) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('isRegistered', 'true');
      localStorage.setItem('isAuthenticated', 'true');
      setIsRegistered(true);
      setUsername(username);
      setPassword(password);
      //toast.success('You Are Registered')
      navigate('/todo');
    } else {
      alert('Please provide both username and password.');
    }
  };

  return (
    <div>
      {!isRegistered ? (
        <div className="container"> 
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="container">
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
