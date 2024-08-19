import React, { useState, useRef } from 'react';
import { login } from "../../services/authServices";
import {Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Mostrar para o professor
  // const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const data = await login(username, password);
      console.log(data);

      if (data.succes) {
        
        window.location.href = '/Inicial';
      } else {
        setError('Usuário não encontrado, verifique novamente!!!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleLogin} className="login-form p-4 rounded shadow">
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nome de Usuário</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onInvalid={(e) => e.target.setCustomValidity('Por favor, insira o nome de usuário')}
            onInput={(e) => e.target.setCustomValidity('')}
            placeholder="Insira o nome de usuário"
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
            onInvalid={(e) => e.target.setCustomValidity('Por favor, insira o nome de usuário')}
            onInput={(e) => e.target.setCustomValidity('')}
            placeholder="*******"
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;