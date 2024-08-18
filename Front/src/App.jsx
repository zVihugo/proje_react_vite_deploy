import React from 'react'
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import './App.css'

//Importando Pages
import Inicial from './pages/Inicial/Inicial'
import Login from './pages/Login/Login'
import Insertion from './pages/Insertion/Insertion'

//Importando componentes
import Navbar from './components/Navbar/Navbar'

//Importando o token
import {getToken} from "./services/authServices"


const ProtegerRotas = ({ element: Component, ...rest }) => {
  const token = getToken();

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};


const App = () => {
  return (
    <div className="App">
      {(location.pathname === '/Inicial' || location.pathname === '/Insertion') && <Navbar />}
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Inicial" element={<ProtegerRotas element={Inicial} />} />
            <Route path="/Insertion" element={<ProtegerRotas element={Insertion} />} />
            
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          </div>
      </BrowserRouter>
    </div>
   
  )
}

export default App