import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {clearToken} from "../../services/authServices";
import logo from "../../images/favicon.png"




function Pressao() {

  const handleLogout = () => {
    clearToken();
    console.log("Deslogado com sucesso");
    window.location.href = "/login";
  }
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
            <Nav.Link href="/Sair" onClick={handleLogout} className="text-white float-start" >
              Sair
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Pressao;
