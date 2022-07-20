import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import './novaCategoria.css';
import { FiCornerDownLeft, FiEdit } from 'react-icons/fi';
import api from '../../services/api';

export default function NovaCategoria() {

  //const [id, setId] = useState(null);
  const [ds_descricao, setDs_descricao] = useState('');

  const { categoriaId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {
    if (categoriaId === '0')
      return;
    else
      loadCategoria();
  }, [])

  async function loadCategoria() {
    try {
      const response = await api.get(`/v1/GetCategoriaId/${categoriaId}`, authorization);

      //setId(response.data.Id);
      setDs_descricao(response.data.ds_descricao);

    } catch (error) {
      alert('erro ao recuperar a Categoria' + error);
      navigate('/categoria');
    }
  }

  async function saveOrUpdate(event) {
    event.preventDefault();

    const data = {
      ds_descricao
    }

    try{
      if(categoriaId==='0')
      {
         await api.post('/v1/CreateCategoria',data,authorization);
      }
      else
      {
         data.id= categoriaId;
         await api.put(`/v1/UpdateCategoria/${categoriaId}`,data,authorization)
      }
    }catch(error){
       alert('Erro ao gravar a categoria ' + error);
    }
    navigate('/categoria');
}


  return (
    <div className="nova-categoria-container">
      <div className="content">
        <section className="form">
          <FiEdit size="105" color="#17202a" />
          <h1>{categoriaId === '0' ? 'Incluir Nova Categoria' : 'Atualizar Categoria'}</h1>
          <Link className='back-link' to="/categoria">
            <FiCornerDownLeft size='35' color="#17202a" />
            Retornar
          </Link>
        </section>
        <form onSubmit={saveOrUpdate}>
          <input placeholder="Nome"
            value={ds_descricao}
            onChange={e => setDs_descricao(e.target.value)}
          />

          <button className="button" type="submit">{categoriaId === '0' ? 'Incluir ' : 'Atualizar '}</button>
        </form>
      </div>
    </div>
  );
}