import React, { useContext, useEffect} from "react";

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
  console.log("Eu to aqui", personagems);

  return (
    <div className="d-flex flex-column align-items-center white-background"> 
    <h1 className="mb-3">Seja, bem vindo(a)</h1>
    <p className="text-center">
      Nossa api tem o tema Dragon Ball, Aqui você pode encontrar alguns personagens desta série!
    </p>
    <Busca onSearch={handleSearch} reset={reset} />
  
    {input.trim() === "" && !error && <InitialMessage />}
  
    {input.trim() === "" && error && <ErrorInput />}
  
    {input.trim() !== "" && (!personagems || personagems.length === 0) && <ErrorName />}
  
    {Array.isArray(personagems) && personagems.map((personagem) => (
      <Personagem key={personagem.post._id} personagem={personagem.post} />
    ))}
  </div>
  );
}

export default Inicial;
