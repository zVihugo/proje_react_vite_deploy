import React from 'react'
import imagem from '../images/images.jpg'
import Alert from   'react-bootstrap/Alert'

const ErrorInput = () => {
  return (

    
    <Alert variant ="danger" className='mt-2'>
      <Alert.Heading className='d-flex justify-content-center'>Digita o nome meu rei</Alert.Heading>
      <div className='d-flex justify-content-center'>
        <img src={imagem} alt="mano-brown-coelhinho"/>
      </div>
      <hr />
      <p className='d-flex justify-content-center'>Parece que alguem aqui ta querendo me dificultar</p>
    </Alert>

    
    // <div className="d-flex flex-column align-items-center text-center bg-light p-3 rounded">
    //   <img src={imagem} alt="mano Brown Coelinho" className="mb-3" />
    //   <p className="font-weight-bold text-danger">Digita o nome meu rei</p>
    //   <p className="text-muted">Parece que alguem aqui ta querendo me dificultar</p>
    // </div>
  )
}

export default ErrorInput