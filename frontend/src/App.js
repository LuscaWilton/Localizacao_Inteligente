import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import './style.css';

// Sempre priorize a variável de ambiente, mas garanta o valor de produção como fallback
const API_URL = process.env.REACT_APP_API_URL || 'https://localizacao-inteligente-5.onrender.com';

function App() {
  const [paises, setPaises] = useState([]);
  const [paisSelecionado, setPaisSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [preferencias, setPreferencias] = useState({
    regiao: '',
    clima: '',
    lingua: '',
    moeda: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nome = localStorage.getItem('nomeUsuario');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (nome) setNomeUsuario(nome);
      else fetchNomeUsuario(token);
    }
  }, []);

  const fetchNomeUsuario = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNomeUsuario(response.data.nome);
      localStorage.setItem('nomeUsuario', response.data.nome);
    } catch (err) {
      setNomeUsuario('Usuário');
    }
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchNomeUsuario(token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setNomeUsuario('');
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleShowCadastro = () => {
    setShowCadastro(true);
  };

  const handleVoltarLogin = () => {
    setShowCadastro(false);
  };

  const buscarPaises = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        handleLogout();
        return;
      }
      const response = await axios.post(`${API_URL}/api/paises/buscar`, preferencias, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaises(response.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        handleLogout();
      } else {
        setError('Erro ao buscar países. Tente novamente.');
      }
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const atualizarBase = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        handleLogout();
        return;
      }
      await axios.post(`${API_URL}/api/paises/atualizar-base`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Base de países atualizada com sucesso!');
      buscarPaises();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Sessão expirada. Por favor, faça login novamente.');
        handleLogout();
      } else {
        setError('Erro ao atualizar base de países.');
      }
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenciasChange = (e) => {
    const { name, value } = e.target;
    setPreferencias(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isAuthenticated) {
    return showCadastro ? (
      <Cadastro onLogin={handleLogin} onVoltar={handleVoltarLogin} />
    ) : (
      <Login onLogin={handleLogin} onCadastro={handleShowCadastro} />
    );
  }

  return (
    <div className="app-wrapper">
      <header className="header glass">
        <nav>
          <a href="#" className="active">Início</a>
          <button onClick={handleLogout} className="logout-button">Sair</button>
        </nav>
      </header>

      <div className="content-area">
        <main className="main-content">
          <div className="filtros-container glass">
            <h3>Filtros de Busca</h3>
            <div className="filtros-grid">
              <div className="filtro-item">
                <label>Região:</label>
                <select name="regiao" value={preferencias.regiao} onChange={handlePreferenciasChange}>
                  <option value="">Todas</option>
                  <option value="americas">Américas</option>
                  <option value="europe">Europa</option>
                  <option value="asia">Ásia</option>
                  <option value="africa">África</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>
              <div className="filtro-item">
                <label>Clima:</label>
                <select name="clima" value={preferencias.clima} onChange={handlePreferenciasChange}>
                  <option value="">Todos</option>
                  <option value="Tropical">Tropical</option>
                  <option value="Temperado">Temperado</option>
                  <option value="Continental">Continental</option>
                  <option value="Variado">Variado</option>
                </select>
              </div>
              <div className="filtro-item">
                <label>Idioma:</label>
                <input
                  type="text"
                  name="lingua"
                  value={preferencias.lingua}
                  onChange={handlePreferenciasChange}
                  placeholder="Digite o idioma"
                />
              </div>
              <div className="filtro-item">
                <label>Moeda:</label>
                <input
                  type="text"
                  name="moeda"
                  value={preferencias.moeda}
                  onChange={handlePreferenciasChange}
                  placeholder="Digite a moeda"
                />
              </div>
            </div>
            <div className="botoes-container">
              <button onClick={buscarPaises} className="botao-buscar">
                Buscar Países
              </button>
              <button onClick={atualizarBase} className="botao-atualizar">
                Atualizar Base
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Carregando informações...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <div className="paises-grid">
            {paises.map((pais) => (
              <div 
                key={pais.id} 
                className="pais-card glass"
                onClick={() => setPaisSelecionado(pais)}
              >
                <h3>{pais.nome}</h3>
                <div className="pais-info">
                  <p><strong>Região:</strong> {pais.regiao}</p>
                  <p><strong>Clima:</strong> {pais.clima}</p>
                  <p><strong>Idioma:</strong> {pais.lingua}</p>
                  <p><strong>Moeda:</strong> {pais.moeda}</p>
                </div>
              </div>
            ))}
          </div>

          {paisSelecionado && (
            <div className="pais-detalhes glass">
              <h2>{paisSelecionado.nome}</h2>
              <div className="detalhes-grid">
                <div className="detalhe-item">
                  <h3>Região</h3>
                  <p>{paisSelecionado.regiao}</p>
                </div>
                <div className="detalhe-item">
                  <h3>Clima</h3>
                  <p>{paisSelecionado.clima}</p>
                </div>
                <div className="detalhe-item">
                  <h3>Idioma</h3>
                  <p>{paisSelecionado.lingua}</p>
                </div>
                <div className="detalhe-item">
                  <h3>Moeda</h3>
                  <p>{paisSelecionado.moeda}</p>
                </div>
              </div>
              <button 
                className="botao-fechar"
                onClick={() => setPaisSelecionado(null)}
              >
                Fechar
              </button>
            </div>
          )}
        </main>
      </div>

      <footer className="footer glass">
        © {new Date().getFullYear()} Localização Inteligente. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default App;