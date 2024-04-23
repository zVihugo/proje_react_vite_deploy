import React, { useState, createContext } from "react";

export const PersonagemContext = createContext();

const Chamado = ({ children }) => {
  const [personagems, setPersonagems] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const reset = () => {
    setPersonagems([]);
    setInput("");
    setError(null);
  };

  //utilizar depois caso queira buscar todos os personagens
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


  const fetchPersonagens = async (searchName) => {
    setInput(searchName);
    console.log("searchName = ", searchName);
    for (let page = 1; page <= 7; page++) {
      const response = await fetch(
        `https://dragonball-api.com/api/characters?name=${searchName}`
      );
      const data = await response.json();
      setPersonagems(data);
    }
  };
  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setError(true);
      return
    } else {
      setError(null)
      await fetchPersonagens(searchTerm);
    }
  };

  const value = {
    personagems,
    reset,
    fetchPersonagens,
    handleSearch,
    input,
    error,
  };

  return (
    <PersonagemContext.Provider value={value}>
      {children}
    </PersonagemContext.Provider>
  );
};

export default Chamado;
