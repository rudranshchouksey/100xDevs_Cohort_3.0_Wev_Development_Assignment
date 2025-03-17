import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const response = await axios.post('http://localhost:3000/users/login', null, {
        headers: {
          username,
          password
        }
      });
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  }

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
