import React from 'react';
import { FaGlobeAmericas, FaCloudSun, FaLanguage, FaMoneyBillWave } from 'react-icons/fa';
import './style.css';

function SidebarLeft() {
  return (
    <aside className="sidebar-left">
      <h3>Filtros rápidos</h3>
      <button className="filter-btn"><FaGlobeAmericas className="icon" /> Continente</button>
      <button className="filter-btn"><FaCloudSun className="icon" /> Clima</button>
      <button className="filter-btn"><FaLanguage className="icon" /> Idioma</button>
      <button className="filter-btn"><FaMoneyBillWave className="icon" /> Moeda</button>
    </aside>
  );
}

export default SidebarLeft; 