import React from 'react';
import { FaSearch, FaGlobe } from 'react-icons/fa';
import './style.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Pesquise um país:" />
      <FaGlobe className="globe-icon" />
    </div>
  );
}

export default SearchBar; 