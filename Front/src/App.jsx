import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Importando Pages
import Inicial from './pages/Inicial/Inicial'
// import Login from './pages/Login/Login'
// import Register from './pages/Register/Register'

const App = () => {
  return (
    <div>
      <Inicial />
    </div>
  )
}

export default App