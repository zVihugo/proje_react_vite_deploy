import React, { useContext} from "react";

//Chamado dos componentestes
import Busca from "./components/Busca";
import Personagem from "./components/Personagem";
import ErrorName from "./components/ErrorName";
import ErrorInput from "./components/ErrorInput";
import InitialMessage from "./components/InitialMessage";
import "./App.css";

//biblioteca css
import "bootstrap/dist/css/bootstrap.min.css";

//Contexto
import { PersonagemContext } from "./components/Chamado";

function App() {
  const { handleSearch, input, personagems, reset, error} =
    useContext(PersonagemContext);

  return (
    <div className="d-flex flex-column align-items-center white-background"> 
      <h1 className="mb-3">Personagens Dragon Ball</h1>
      <p className="text-center">
        Você pode buscar um personagem específico, gerar aleatórios ou até mesmo
        todos, basta digitar todos
      </p>
      <p className="text-center">
        <strong>
          Obs: Como a API está em espanhol, procure o nome de acordo com o
          idioma!
        </strong>
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

export default App;
