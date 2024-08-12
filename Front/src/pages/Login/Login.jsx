import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      alert("Login bem-sucedido!");
    } else {
      setError("Nome de usuário ou senha incorretos.");
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
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
}

export default Login;