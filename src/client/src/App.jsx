import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/Cadastro.jsx';
import CadastroEsmalte from './pages/CadastroEsmalte.jsx';
import Login from './pages/Login.jsx';
import VisualizarEsmaltes from './pages/VisualizarEsmaltes.jsx';
import DetalhesEsmalte from './pages/DetalhesEsmalte.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/cadastroEsmalte" element={<CadastroEsmalte />} /> 
        <Route path='/VisualizarEsmaltes' element={<VisualizarEsmaltes/>}/>
        <Route path="/DetalhesEsmalte/:id" element={<DetalhesEsmalte />} />
      </Routes>
    </Router>
  );
}

export default App;
