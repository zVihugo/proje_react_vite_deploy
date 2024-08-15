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
      <Navbar/>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login/>}/>
            
            <Route path="/Inicial" element={<Inicial/>}/>
            
            <Route path="/Insertion" element={<Insertion/>}/>
            
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
          </div>
      </BrowserRouter>
    </div>
   
  )
}

export default App