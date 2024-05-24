import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any) => {
    event.preventDefault();
  
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Credenciais inválidas');
        }
      })
      .then(data => {
        console.log(data.message);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Erro ao processar a solicitação:', error);
        alert(error.message);
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#383837',
      color: '#10D1E9',
      padding: '16px'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2c2c2c',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <label htmlFor="username" style={{ marginBottom: '8px', fontSize: '1.125rem' }}>Username</label>
        <input 
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginBottom: '16px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #10D1E9',
            fontSize: '1rem',
            width: '200px'
          }}
        />
        <label htmlFor="password" style={{ marginBottom: '8px', fontSize: '1.125rem' }}>Password</label>
        <input 
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginBottom: '24px',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #10D1E9',
            fontSize: '1rem',
            width: '200px'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#145EF4',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '4px',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#10D1E9'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#145EF4'}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
