import React from 'react'
import imagem from '../images/images.jpg'

const ErrorInput = () => {
  return (
    <div className="d-flex flex-column align-items-center text-center bg-light p-3 rounded">
      <img src={imagem} alt="mano Brown Coelinho" className="mb-3" />
      <p className="font-weight-bold text-danger">Digita o nome meu rei</p>
      <p className="text-muted">Parece que alguem aqui ta querendo me dificultar</p>
    </div>
  )
}

export default ErrorInput