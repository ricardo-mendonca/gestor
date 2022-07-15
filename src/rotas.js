import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Login from './pages/Login';
import Alunos from './pages/Aluno';
import NovoAluno from './pages/NovoAluno';

function Rotas(){
return(
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/aluno/novo/:alunoId" element={<NovoAluno />} />
        </Routes>
    </Router>
)

}

export default Rotas