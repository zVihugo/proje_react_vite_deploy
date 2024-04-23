import React from 'react'

const Personagem = ({personagem}) => {
    return (
        <li className="d-flex flex-column align-items-center text-center">
            <img src={personagem.image} alt={personagem.name} className="mb-2" />
            <h3>{personagem.name}</h3>
            <p>{personagem.description}</p>
        </li>
    )
}

export default Personagem