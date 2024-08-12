import React from 'react'
import Card from 'react-bootstrap/Card'

const Personagem = ({personagem}) => {
    return (
        //Utilizando o react bootstrap
        <Card style={{width: '30rem', marginTop: '20px'}}>
            <Card.Body>
                <Card.Title>
                    {personagem.name}
                </Card.Title>   
                <Card.Img variant="" src={personagem.image}/>
                <Card.Text>
                    {personagem.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Personagem