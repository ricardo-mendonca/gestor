import React, { useState, useEffect } from 'react';
import './despesa.css';
import api from '../../services/api';

export default function Despesa() {

const [data, setData]= useState([]);

    //pegando token
    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const despesasGet = async()=>{
        api.get('/v1/GetDespesaMes?cd_mes=05&cd_ano=2022', authorization)
            .then(response=>{
                setData(response.data);
            }).catch(error=>{
                console.log(error);
            })
    }
    useEffect(()=>{
        despesasGet();
    },[])

    return (
        <div>
            <h1>Relação de despesas</h1>
            <header>
                <button>Incluir Nova Despesa</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>nome</th>
                        <th>vencimento</th>
                        <th>valor</th>
                        <th>parcela</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(despesa=>(
                        <tr key={despesa.id}>
                            <td>{despesa.id}</td>
                            <td>{despesa.id_categoria}</td>
                            <td>{despesa.vl_valor_parc}</td>
                            <td>{despesa.dt_vencimento}</td>
                            <td>
                                botão1 e botao 2
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}
