import React, { useState } from 'react';
import {login} from "../../services/authServices";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const data = await login(username, password);
      console.log(data);

      if (data.success) {
        window.location.href = "/Inicial";
      } else {
        setError('Usuário não encontrado, verifique novamente!!!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-60 mx-auto mt-5">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nome de Usuário</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome de Usuário"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default Login;