import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Insertion.module.css";
import axios from 'axios';
import { API_URL } from "../../config/config";
import {getToken} from "../../services/authServices";


const Insertion = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleInsertion = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    const token = getToken();
    console.log(token);
  
    try {
      const response = await axios.post(`${API_URL}/api/postagens`, {
        titulo: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        imagem: image,
        conteudo: description
      }, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      console.log(response);
      if (response.status === 200) {
        setSuccess("Postagem criada com sucesso!");
        setName("");
        setImage("");
        setDescription("");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        clearToken();
        window.location.href = "/login";
      } else {
        setError("Ocorreu um erro ao criar a postagem.");
      }
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center ${styles["white-background"]}`}>
      <h1 className="mb-3">Inserir Personagem</h1>
      <form onSubmit={handleInsertion} className="w-80">
        <div className="mb-4">
          <label htmlFor="name" className="form-label">Nome do Personagem</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="form-label">URL da Imagem</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">Inserir</button>
      </form>
    </div>
  );
}

export default Insertion;
