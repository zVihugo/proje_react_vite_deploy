import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css'; // Certifique-se de que o caminho está correto

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/api/login', {
        username,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center ${styles["white-background"]}`}>
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleLogin} className="w-80">
        <div className="mb-4">
          <label htmlFor="username" className="form-label">Nome de Usuário</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;