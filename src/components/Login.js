import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('username', name);
      onLogin(name);
    }
  };

  return (
    <div className="login">
      <h2>Welcome! Please Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter username" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;