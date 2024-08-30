import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./Buscar-style.css";
import axios from "axios";
import { API_URL } from "../../config/config";

const Busca = ({ onSearch, reset }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [personagems, setPersonagems] = useState([]);

  const handleReset = () => {
    reset();
    setInputValue("");
    setSuggestions([]);
  };

  useEffect(() => {
    fetchAllPersonagens();
  }, []);

  const handleChange = (e) => {
    const maisculo = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
  
    const inputValue = maisculo(e.target.value);
    setInputValue(inputValue);
    console.log("e.target.value = ", e.target.value);
    console.log(personagems);
  
    const filteredSuggestions = personagems.filter((personagem) =>
      personagem.titulo.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  
    console.log(filteredSuggestions);
    setSuggestions(filteredSuggestions);
    if (e.target.value === "") setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      console.log("inputValue = ", inputValue);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const fetchAllPersonagens = async () => {
    let fetched = [];
    try {
      const response = await axios.get(`${API_URL}/api/postagens`);
      const data = response.data;
      console.log(data.posts);
      fetched = fetched.concat(data.posts);
      console.log(fetched);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
    setPersonagems(fetched);
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Digite o nome do personagem"
        className="form-control mb-3 p-3 w-100"
      />
      <div className="sugestoes">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion._id}
            className="sugestao"
            onClick={() => onSearch(suggestion.titulo)}
          >
            {suggestion.titulo}
          </div>
        ))}
      </div>
      <div
        className="d-flex flex-row justify-content-evenly"
        style={{ width: "300px" }}
      >
        <Button
          onClick={() => handleKeyPress({ key: "Enter" })}
          variant="dark"
          size="lg"
        >
          Buscar
        </Button>
        <Button onClick={() => handleReset()} variant="secondary" size="lg">
          Resetar
        </Button>
      </div>
    </div>
  );
};

export default Busca;
