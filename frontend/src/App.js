import React from 'react';
import SidebarLeft from './SidebarLeft';
import SearchBar from './SearchBar';
import './style.css';

const popularCountries = [
  {
    name: 'Brasil',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'O país do futebol, praias e florestas tropicais.'
  },
  {
    name: 'Estados Unidos',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    desc: 'Diversidade cultural e grandes cidades.'
  },
  {
    name: 'França',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    desc: 'Romance, gastronomia e monumentos históricos.'
  },
  {
    name: 'Japão',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    desc: 'Tecnologia, tradição e paisagens únicas.'
  }
];

function App() {
  return (
    <div className="app-wrapper">
      <header className="header glass">
        <h1>Localização Inteligente</h1>
        <nav>
          <a href="#">Início</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </nav>
      </header>
      <div className="content-area">
        <SidebarLeft />
        <main className="main-content">
          <div className="banner">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80" alt="Banner" />
            <div className="banner-text">
              <h2>Descubra o mundo de forma inteligente</h2>
              <p>Busque, filtre e explore países com tecnologia e praticidade.</p>
            </div>
          </div>
          <SearchBar />
          <section className="popular-section">
            <h3>Países Populares</h3>
            <div className="popular-cards">
              {popularCountries.map((c, i) => (
                <div className="country-card-modern" key={i}>
                  <img src={c.img} alt={c.name} />
                  <div className="country-info">
                    <h4>{c.name}</h4>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <footer className="footer glass">
        © {new Date().getFullYear()} Localização Inteligente. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default App; 