import React from 'react'
import download from '../images/download.png'

const ErrorName = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center p-3 rounded">
      <img src={download} alt="emoji" className="mb-3" />
      <p className="font-weight-bold text-dark">Personagem não encontrado</p>
      <p className="text-dark">Te orienta fiote, não tem esse personagem aqui não</p>
    </div>
  )
}

export default ErrorName