import React from 'react';
import './style.css';

const countries = [
  {
    flag: '🇲🇽',
    name: 'México',
    desc: 'Com cerca de 128 milhões de habitantes, este país da América encanta com sua cultura vibrante! Sua moeda é o Peso Mexicano, e o idioma oficial é o Espanhol. O clima varia de desértico a tropical, tornando cada região única!'
  },
  {
    flag: '🇪🇸',
    name: 'Espanha',
    desc: 'Na Europa, com 47 milhões de habitantes, a Espanha é um destino cheio de história e belas paisagens! A moeda oficial é o Euro, e o idioma, o Espanhol. O clima mediterrâneo traz verões quentes e invernos suaves, perfeitos para explorar o país!'
  },
  {
    flag: '🇧🇷',
    name: 'Brasil',
    desc: 'O gigante da América do Sul tem 203 milhões de habitantes e uma diversidade incrível! A moeda é o Real, e o idioma falado é o Português. Seu clima tropical garante calor e belas paisagens o ano todo!'
  },
  {
    flag: '🇫🇷',
    name: 'França',
    desc: 'Berço da arte e da gastronomia, a França possui 67 milhões de habitantes. O Euro é a moeda oficial, e o idioma é o Francês. O clima é variado, do mediterrâneo ao oceânico.'
  },
  {
    flag: '🇺🇸',
    name: 'Estados Unidos',
    desc: 'Com 331 milhões de habitantes, esse país da América do Norte impressiona pelo tamanho e diversidade! Sua moeda é o Dólar Americano, e o idioma mais falado é o Inglês. O clima é variado, do ártico no Alasca ao tropical na Flórida!'
  }
];

function SidebarRight() {
  return (
    <aside className="sidebar-right">
      <div className="right-title">Países Mais frequentados:</div>
      <div className="country-list">
        {countries.map((c, i) => (
          <div className="country-card" key={i}>
            <span className="flag">{c.flag}</span>
            <div className="country-desc">
              <strong>{c.name}</strong>
              <p>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SidebarRight; 