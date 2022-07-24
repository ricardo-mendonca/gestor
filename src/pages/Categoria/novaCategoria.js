import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./novaCategoria.css";
import { FiCornerDownLeft, FiEdit } from "react-icons/fi";
import api from "../../services/api";
import { Col, Row, Button, Table } from "react-bootstrap";

export default function NovaCategoria() {
  //const [id, setId] = useState(null);
  const [ds_descricao, setDs_descricao] = useState("");

  const { categoriaId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (categoriaId === "0") return;
    else loadCategoria();
  }, []);

  async function loadCategoria() {
    try {
      const response = await api.get(
        `/v1/GetCategoriaId/${categoriaId}`,
        authorization
      );

      //setId(response.data.Id);
      setDs_descricao(response.data.ds_descricao);
    } catch (error) {
      alert("erro ao recuperar a Categoria" + error);
      navigate("/categoria");
    }
  }

  async function saveOrUpdate(event) {
    event.preventDefault();

    const data = {
      ds_descricao,
    };

    try {
      if (categoriaId === "0") {
        await api.post("/v1/CreateCategoria", data, authorization);
      } else {
        data.id = categoriaId;
        await api.put(
          `/v1/UpdateCategoria/${categoriaId}`,
          data,
          authorization
        );
      }
    } catch (error) {
      alert("Erro ao gravar a categoria " + error);
    }
    navigate("/categoria");
  }

  return (
    <div className="novaCategoria_container">
      <div className="content">
        <Row className="mb-1">
          <Col md={9}>
            <FiEdit size="105" color="#17202a" />
            <h1>
              {categoriaId === "0"
                ? "Incluir Nova Categoria"
                : "Atualizar Categoria"}
            </h1>
          </Col>
          <Col md={3} className="d-grid gap-2">
            <br/>
            <Button variant="primary" size="lg"
                onClick={() => navigate("/categoria")}>
              <FiCornerDownLeft size="35" color="#17202a" />
              Retornar
            </Button>
          </Col>
        </Row>

        <form onSubmit={saveOrUpdate}>
          <input
            placeholder="Nome"
            value={ds_descricao}
            onChange={(e) => setDs_descricao(e.target.value)}
          />
          <br/>
          <div className="d-grid gap-2">
            <br/>
          <Button variant="primary" type="submit" size="lg">
            {categoriaId === "0" ? "Incluir " : "Atualizar "}
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
