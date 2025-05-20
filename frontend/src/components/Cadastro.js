import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Cadastro = ({ onLogin, onVoltar }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                nome,
                email,
                senha
            });
            
            const token = response.data;
            localStorage.setItem('token', token);
            onLogin(token);
        } catch (error) {
            setError(error.response?.data || 'Erro ao realizar cadastro');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Cadastro</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
                <button type="button" onClick={onVoltar} className="voltar-button">
                    Voltar para Login
                </button>
            </form>
        </div>
    );
};

export default Cadastro; 