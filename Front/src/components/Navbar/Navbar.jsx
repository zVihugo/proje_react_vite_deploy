import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/favicon.png"



function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="white" className="text-white">
        <Container>
          <Navbar.Brand href="/Inicial" className="text-white">
            <img src={logo} alt="Logo" style={{ width: '60px', height: 'auto' }}/>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Inicial" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="/Insertion" className="text-white">
              Inserir
            </Nav.Link>
            <Nav.Link href="/Sair" className="text-white float-start" >
              Sair
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
