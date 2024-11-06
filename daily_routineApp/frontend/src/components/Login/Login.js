import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://daily-routineapp-backend.cloud-stacks.com/api/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        history.push('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password.');
      } else {
        setError('Internal server error');
      }
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Website Branding</h1>
      </header>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">Log In</button>
        <div className="additional-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/create-account">Create Account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
