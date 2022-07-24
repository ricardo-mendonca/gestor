import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Footer from './components/layout/Footer';
import NavbarMenu from './components/layout/NavbarMenu';
import Container from './components/layout/Container'

//paginas
import Login from './pages/Login';
import Home from './pages/Home/home';
import Categoria from './pages/Categoria/categoria';
import NovaCategoria from './pages/Categoria/novaCategoria'
import Despesa from './pages/Despesas/despesa'

function Rotas() {
    return (
        <Router>
            <NavbarMenu />
            <Container >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                
                    <Route path="/categoria" element={<Categoria />} />
                    <Route path="/despesa" element={<Despesa />} />
                    <Route path="/novaCategoria/novo/:categoriaId" element={<NovaCategoria />} />
                </Routes>
            </Container>
            <Footer />
        </Router>
    )

}

export default Rotas