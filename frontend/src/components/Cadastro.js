import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Cadastro = ({ onLogin, onVoltar }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação do nome
        if (nome.trim().length < 3) {
            setError('O nome deve ter pelo menos 3 caracteres');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { nome, email, senha });
            
            setSuccess(true);
            // Limpa os campos após o cadastro
            setNome('');
            setEmail('');
            setSenha('');
            
            // Aguarda 2 segundos antes de voltar para o login
            setTimeout(() => {
                onVoltar();
            }, 2000);
            
        } catch (error) {
            setError(error.response?.data || 'Erro ao realizar cadastro');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Cadastro</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Cadastro realizado com sucesso! Redirecionando...</div>}
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        minLength={3}
                        placeholder="Digite seu nome completo"
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
                <button type="submit" disabled={success}>Cadastrar</button>
                <button type="button" onClick={onVoltar} className="voltar-button">
                    Voltar para Login
                </button>
            </form>
        </div>
    );
};

export default Cadastro; 