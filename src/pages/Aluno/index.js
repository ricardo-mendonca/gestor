import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './styles.css';
import api from '../../services/api';

import logoCadastro from '../../assets/cadastro1.png'
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi'

export default function Alunos() {

    const [nome, setNome] = useState('');
    const [alunos, setAlunos] = useState([]);
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [updateData, setUpdateData] = useState(true);

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (updateData) {
            api.get('/v1/GetCategoria', authorization).then(
                response => {
                    setAlunos(response.data);
                    setUpdateData(false);
                }, token)
        }
    }, [updateData])

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch (error) {
            alert('não foi possível fazer o logout ' + error)
        }
    }

    return (
        <div className='aluno-container'>
            <header>
                <img src={logoCadastro} alt="Cadastro" />
                <span> bem vindo, <strong>{email}</strong>! </span>
                <Link className='button' to="/aluno/novo/0">Novo Aluno</Link>

                <button onClick={logout} type="button">
                    <FiXCircle size={35} color="#17202a" />
                </button>

            </header>
            <form>
                <input type='text' placeholder="Nome" />
                <button type="button" className='button'>
                    Filtrar aluno por nome(parcial)
                </button>
            </form>
            <h1>Relação de Alunos</h1>

            <ul>

                {alunos.map(aluno => (
                    <li key={aluno.id}>
                        <b>Nome:</b>{aluno.ds_descricao}<br /><br />
                        <b>Nome:</b>{aluno.email}<br /><br />
                        <b>Nome:</b>{aluno.idade}<br /><br />

                        <button type="button">
                            <FiEdit size={25} color="#17202a" />
                        </button>

                        <button type="button">
                            <FiUserX size={25} color="#17202a" />
                        </button>
                    </li>
                ))}
            </ul>





        </div>
    )
}