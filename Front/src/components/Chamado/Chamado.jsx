import React, { useState, createContext, useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../../config/config";

export const PersonagemContext = createContext();

const Chamado = ({ children }) => {
  const [personagems, setPersonagems] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const reset = () => {
    setPersonagems([]);
    setInput("");
    setError(null);
    setSuggestions([]);
  };

  // const fetchPersonagens = async (searchName) => {
  //   setInput(searchName);
  //   console.log("searchName = ", searchName);
  //   for (let page = 1; page <= 7; page++) {
  //     const response = await fetch(
  //       `https://dragonball-api.com/api/characters?name=${searchName}`
  //     );
  //     const data = await response.json();
  //     setPersonagems(data);
  //   }
  // };

  const fetchPersonagens = async (searchName) => {
    setInput(searchName);
    console.log("searchName = ", searchName);
    try {
      const response = await axios.get(`${API_URL}/api/postagens/${searchName}`);
      const data = response.data;
      console.log(data);
      if (data && data.length > 0) {
        setPersonagems([data]);
      } else {
        setPersonagems(null);
        console.log("Nenhum personagem encontrado");
      }
      console.log(personagems);
    } catch (error) {
      console.error("Erro ao buscar postagens:", error);
      setPersonagems(null);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 1) {
      setError(true);
      return;
    } else {
      setError(null);
      await fetchPersonagens(searchTerm);
    }
  };
  const value = useMemo(
    () => ({
      personagems,
      reset,
      fetchPersonagens,
      handleSearch,
      suggestions,
      input,
      error,
      setInput,
    }),
    [personagems, input, error, suggestions]
  );

  return (
    <PersonagemContext.Provider value={value}>
      {children}
    </PersonagemContext.Provider>
  );
};

export default Chamado;
