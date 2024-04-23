import React, { useState} from "react";

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
        onKeyPress={handleKeyPress}
        placeholder="Digite o nome do personagem"
        className="form-control mb-3"
        style={{ padding: "10px", height: "auto", width: "300px" }}
      />
      <div
        className="d-flex flex-row justify-content-evenly"
        style={{ width: "300px" }}
      >
        <button
          onClick={() => handleKeyPress({key: 'Enter'})}
          
          className="btn btn-success"
        >
          Buscar
        </button>
        <button onClick={() => reset()} className="btn btn-primary">
          Resetar
        </button>
      </div>
    </div>
  );
};

export default Busca;