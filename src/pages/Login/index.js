import React, { useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logoImage from '../../assets/login.png';

export default function Login() {

    const [ds_email, setEmail] = useState('');
    const [ds_senha, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        const data = {
            ds_email, ds_senha
        }
        try {
            const response = await api.post('/v1/login', data);
            localStorage.setItem('email', ds_email);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            alert('o login falhou ' + error)
        }
    }

    return (
        <div className="login_container">
            <section className="form">
                <img src={logoImage} alt="login" id="img1" />
                <form onSubmit={login}>
                    <h1>Cadastro de usuário</h1>
                    <input placeholder="Email"
                        value={ds_email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password"
                        value={ds_senha}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-grid gap-2">
                        <br/>
                    <Button variant="primary" size="lg" type="submit">Login</Button>
                    </div>
                    
                </form>
            </section>
        </div>
    )
}