import React, { useState, useEffect } from "react";
import "./despesa.css";
import api from "../../services/api";
import DateRangePickerComp from "../../components/DateRangePickerComp";
import { Col, Row, Button, Table } from "react-bootstrap";

export default function Despesa() {
  const [data, setData] = useState([]);

  //pegando token
  const token = localStorage.getItem("token");
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const despesasGet = async () => {
    api
      .get("/v1/GetDespesaMes?cd_mes=05&cd_ano=2022", authorization)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    despesasGet();
  }, []);

  return (
    <div className="despesa_container">
      <br />
      <Row className="mb-1">
        <Col md={9}>
          <h1>Relação de despesas</h1>
        </Col>
        <Col md={3} className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Incluir Nova Despesa
          </Button>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={3}>
          <DateRangePickerComp />
        </Col>
        <Col md={2}>
          <Button variant="primary" size="lg">
            Pesquisar
          </Button>
        </Col>
      </Row>

      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>nome</th>
            <th>vencimento</th>
            <th>valor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.id}</td>
              <td>{despesa.id_categoria}</td>
              <td>{despesa.vl_valor_parc}</td>
              <td>{despesa.dt_vencimento}</td>
              <td>
                <Button variant="primary" size="sm">
                  Editar
                </Button>{" "}
                <Button variant="danger" size="sm">
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
