import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import './categoria.css';


export default function Categoria() {
    //filtrar dados
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();


    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    //filtrar dados
    const searchcategorias = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const dadosFiltrados = categorias.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        }
        else {
            setFiltro(categorias);
        }
    }


    useEffect(() => {
        api.get('/v1/GetCategoria', authorization).then(
            response => {
                setCategorias(response.data);
            }, token)

    }, [])


    async function editCategorias(id) {
        try {
            navigate(`/novaCategoria/novo/${id}`)
        } catch (error) {
            alert('não foi possivel carregar a Categoria')
        }
    }

    //deletar Categoria
    async function deleteCategoria(id) {
        try {
            if (window.confirm('Deseja deletar a categoria de id = ' + id + ' ?')) {
                await api.delete(`/v1/DeleteCategoria/${id}`, authorization);
                setCategorias(categorias.filter(categoria => categoria.id !== id));
            }
        } catch (error) {
            alert('Não foi possível excluir a categoria')
        }
    }

    return (
        <div className='categoria-container'>
            <header>
                <Link className='button' to="/novaCategoria/novo/0">Nova Categoria</Link>
            </header>
            <form>
                <input type='text'
                    placeholder='Filtrar por nome...'
                    onChange={(e) => searchcategorias(e.target.value)}
                />
            </form>

            <h1>Relação de Categorias</h1>
            {searchInput.length > 1 ? (
                <ul>
                    {filtro.map(categoria => (
                        <li key={categoria.Id}>
                            <b>id:</b>{categoria.id}<br /><br />
                            <b>Nome:</b>{categoria.ds_descricao}<br /><br />

                            <button onClick={() => editCategorias(categoria.id)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>
                            <button type="button" onClick={() => deleteCategoria(categoria.id)}>
                                <FiTrash2 size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria.id}>
                            <b>id:</b>{categoria.id}<br /><br />
                            <b>Nome:</b>{categoria.ds_descricao}<br /><br />

                            <button onClick={() => editCategorias(categoria.id)} type="button">
                                <FiEdit size="25" color="#17202a" />
                            </button>

                            <button type="button" onClick={() => deleteCategoria(categoria.id)}>
                                <FiTrash2 size="25" color="#17202a" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}