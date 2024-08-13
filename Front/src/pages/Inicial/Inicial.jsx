import React, { useContext, useEffect} from "react";

//Importando axios
import axios from 'axios';


//importando URL da API
import { API_URL } from "../../config/config";

//Chamado dos componentestes
import Busca from "../../components/Busca/Busca";
import Personagem from "../../components/Personagem/Personagem";
import ErrorName from "../../components/ErrorName/ErrorName";
import ErrorInput from "../../components/ErrorInput/ErrorInput";
import InitialMessage from "../../components/InitialMessage/InitialMessage";


//biblioteca css
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Inicial.module.css";

//Contexto
import { PersonagemContext } from "../../components/Chamado/Chamado";

function Inicial() {
  const { handleSearch, input, personagems, reset, error} =
  useContext(PersonagemContext);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/postagens`);
        console.log(response.data); // Exibir os dados no console
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
      }
    };

    fetchPostagens();
  }, []);


  return (
    <div className="d-flex flex-column align-items-center white-background"> 
    <h1 className="mb-3">Personagens Dragon Ball</h1>
    <p className="text-center">
      Você pode buscar um personagem específico, basta digitar o nome abaixo!
    </p>
    <Busca onSearch={handleSearch} reset={reset} />
  
    {input.trim() === "" && !error && <InitialMessage />}
  
    {input.trim() === "" && error && <ErrorInput />}
  
    {input.trim() !== "" && personagems.length === 0 && <ErrorName />}
  
    {Array.isArray(personagems) && personagems.map((personagem) => (
      <Personagem key={personagem.ids} personagem={personagem} />
    ))}
  </div>
  );
}

export default Inicial;
