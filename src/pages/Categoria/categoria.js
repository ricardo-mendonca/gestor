import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./categoria.css";
import { Col, Row, Button, Table } from "react-bootstrap";

export default function Categoria() {
  //filtrar dados
  const [searchInput, setSearchInput] = useState("");
  const [filtro, setFiltro] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //filtrar dados
  const searchcategorias = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const dadosFiltrados = categorias.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFiltro(dadosFiltrados);
    } else {
      setFiltro(categorias);
    }
  };

  useEffect(() => {
    api.get("/v1/GetCategoria", authorization).then((response) => {
      setCategorias(response.data);
    }, token);
  }, []);

  async function editCategorias(id) {
    try {
      navigate(`/novaCategoria/novo/${id}`);
    } catch (error) {
      alert("não foi possivel carregar a Categoria");
    }
  }

  //deletar Categoria
  async function deleteCategoria(id) {
    try {
      if (window.confirm("Deseja deletar a categoria de id = " + id + " ?")) {
        await api.delete(`/v1/DeleteCategoria/${id}`, authorization);
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
      }
    } catch (error) {
      alert("Não foi possível excluir a categoria");
    }
  }

  return (
    <div className="categoria_container">
      <br />
      <Row className="mb-1">
        <Col md={9}>
          <h1>Relação de Categorias</h1>
        </Col>
        <Col md={3} className="d-grid gap-2">
          <Button onClick={() => navigate("/novaCategoria/novo/0")}>
            Nova Categoria
          </Button>
        </Col>
      </Row>
      <form>
        <input
          type="text"
          placeholder="Filtrar por nome..."
          onChange={(e) => searchcategorias(e.target.value)}
        />
      </form>

      {searchInput.length > 1 ? (


      
<Table striped bordered hover>
<thead>
  <tr>
    <th>Id</th>
    <th>Nome:</th>

    <th >Ações</th>
  </tr>
</thead>
<tbody>
{filtro.map((categoria) => (
    <tr key={categoria.id}>
      <td>{categoria.id}</td>
      <td>{categoria.ds_descricao}</td>

      <td>
        <Button
          onClick={() => editCategorias(categoria.id)}
          variant="primary" 
        >
          <FiEdit size="25" color="black" />
        </Button>{" "}
        <Button
          variant="danger" 
          onClick={() => deleteCategoria(categoria.id)}
        >
          <FiTrash2 size="25" color="black" />
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</Table>


      ) : (

        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome:</th>

            <th >Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.ds_descricao}</td>

              <td>
                <Button
                  onClick={() => editCategorias(categoria.id)}
                  variant="primary"
                >
                  <FiEdit size="25" color="black" />
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => deleteCategoria(categoria.id)}
                >
                  <FiTrash2 size="25" color="black" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      )}




    </div>
  );
}
