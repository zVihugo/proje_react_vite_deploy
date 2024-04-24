import React, { useState, useContext}from "react";
import Button from "react-bootstrap/Button";

const Busca = ({ onSearch, reset }) => {
  const [inputValue, setInputValue] = useState("");
  

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") {
      onSearch(inputValue);
      console.log("inputValue = ", inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        /*Não sei pq ta descontinuado???????*/
        onKeyPress={handleKeyPress}
        placeholder="Digite o nome do personagem"
        className="form-control mb-3 p-3 w-100"
      />
      <div
        className="d-flex flex-row justify-content-evenly"
        style={{ width: "300px" }}
      >
        <Button
          onClick={() => handleKeyPress({key: 'Enter'})}
          
          variant="success" 
          size = "lg"
        >
          Buscar
        </Button>
        <Button onClick={() => reset()} variant="primary" size="lg">
          Resetar
        </Button>
      </div>
    </div>
  );
};

export default Busca;