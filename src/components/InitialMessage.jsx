import React from 'react'
import homer from '../images/homer-duvida.png'

const InitialMessage = () => {
    return (
        <div className='d-flex flex-column align-items-center text-center bg-light p-3 rounded'>
            <p className='font-weight-bold'>Vamos iniciar a pesquisa?</p>
            <img src={homer} alt="homer-barrigudo" />
            <p className='font-weight-bold'>basta digitar o nome do personagem escolhido....</p>
        </div>
    )
}

export default InitialMessage