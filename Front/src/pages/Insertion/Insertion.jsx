import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Insertion.module.css";

function Insertion() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleInsertion = (e) => {
    e.preventDefault();

    if (name && image && description) {
      alert("Personagem inserido com sucesso!");
      
    } else {
      setError("Todos os campos são obrigatórios.");
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
        <button type="submit" className="btn btn-primary">Inserir</button>
      </form>
    </div>
  );
}

export default Insertion;