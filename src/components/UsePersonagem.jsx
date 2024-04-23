// usePersonagem.js
import { useState } from "react";

const usePersonagem = () => {
  const [personagems, setPersonagems] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const reset = () => {
    setPersonagems([]);
    setInput("");
    setError(null);
  };

  const fetchAllPersonagens = async () => {
    let fetched = [];
    for (let page = 1; page <= 7; page++) {
      const response = await fetch(
        `https://dragonball-api.com/api/characters?page=${page}`
      );
      const data = await response.json();
      fetched = fetched.concat(data.items);
    }
    setPersonagems(fetched);
  };

  const fetchPersonagens = async (searchName) => {
    let data = [];
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
      return;
    } else {
      setError(null);
      await fetchPersonagens(searchTerm);
    }
  };

  return {
    personagems,
    reset,
    fetchPersonagens,
    handleSearch,
    input,
    error,
  };
};

export default UsePersonagem;