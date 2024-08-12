import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Chamado from './components/Chamado';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Chamado>
      <App />
    </Chamado>
  </React.StrictMode>,
  document.getElementById('root')
);