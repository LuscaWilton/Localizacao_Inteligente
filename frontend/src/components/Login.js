import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin, onCadastro }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL || 'https://localizacao-inteligente-5.onrender.com'}/api/auth/login`,
                { email, senha },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data) {
                const token = response.data;
                localStorage.setItem('token', token);
                onLogin(token);
            } else {
                setError('Resposta inválida do servidor');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Erro ao fazer login. Tente novamente.');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
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
                <button type="submit">Entrar</button>
                <button type="button" onClick={onCadastro} className="cadastro-button">
                    Criar Conta
                </button>
            </form>
        </div>
    );
};

export default Login; 