import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'

//Importando Pages
import Inicial from './pages/Inicial/Inicial'
import Login from './pages/Login/Login'
import Insertion from './pages/Insertion/Insertion'

//Importando componentes
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
        <div className="container">
          <Routes>
            {/* Pagina Inicial */}
            <Route path="/" element={<Inicial/>}/>
            <Route path="/Auth" element={<Login/>}/>
            <Route path="/Insertion" element={<Insertion/>}/>
            
            {/* Caso o usuário não ache a página, ele será redirecionado para a página inicial */}
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App