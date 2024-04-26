import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import "./Buscar-style.css";


const Busca = ({ onSearch, reset }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [personagems, setPersonagems] = useState([]);


  const handleReset = () => {
    reset()
    //setPersonagems([]);
    setInputValue("");
    setSuggestions([]);
  }

  useEffect(() => {
    fetchAllPersonagens();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    const filteredSuggestions = personagems.filter((personagem) =>
      personagem.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    if(e.target.value === "") setSuggestions([]); 
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
    for (let page = 1; page <= 7; page++) {
      const response = await fetch(
        `https://dragonball-api.com/api/characters?page=${page}`
      );
      const data = await response.json();
      console.log(data);
      fetched = fetched.concat(data.items);
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
          <div key={suggestion.id} className="sugestao" onClick={() => onSearch(suggestion.name)}>
            {suggestion.name}
          </div>
        ))}
      </div>
      <div
        className="d-flex flex-row justify-content-evenly"
        style={{ width: "300px" }}
      >
        <Button
          onClick={() => handleKeyPress({ key: "Enter" })}
          variant="success"
          size="lg"
        >
          Buscar
        </Button>
        <Button onClick={() => handleReset()} variant="primary" size="lg">
          Resetar
        </Button>
      </div>
    </div>
  );
};

export default Busca;