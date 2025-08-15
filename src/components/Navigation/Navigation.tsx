import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation: React.FC = () => (
  <nav className="mystical-nav">
    {/* 🔮 Sección */}
    <div className="nav-brand">
      <div className="nav-logo">🔮</div>
      <div className="nav-text">
        <h1 className="nav-title">Tarot STEM</h1>
        <p className="nav-subtitle">Diosas Contemporáneas</p>
      </div>
    </div>

    {/* Enlaces de navegación con efectos */}
    <div className="nav-links">
      <NavLink 
        to="/" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        <span className="nav-icon">🃏</span>
        Todas las Cartas
      </NavLink>
      <NavLink 
        to="/reading" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        <span className="nav-icon">✨</span>
        Tirada de Cartas
      </NavLink>
    </div>

    {/*Elementos místicos + decoración */}
    <div className="nav-decoration">
      {/* 🔥💧🌱💨 Los 4 elementos místicos con tooltips */}
      <div className="mystical-elements">
        <span 
          className="element fire" 
          title="Fuego - Pasión y Energía"
          aria-label="Elemento Fuego"
        >
          🔥
        </span>
        <span 
          className="element water" 
          title="Agua - Intuición y Emociones"
          aria-label="Elemento Agua"
        >
          💧
        </span>
        <span 
          className="element earth" 
          title="Tierra - Estabilidad y Práctica"
          aria-label="Elemento Tierra"
        >
          🌱
        </span>
        <span 
          className="element air" 
          title="Aire - Intelecto y Comunicación"
          aria-label="Elemento Aire"
        >
          💨
        </span>
      </div>

      {/* Decoración celestial renovada */}
      <div className="celestial-decoration">
        <span className="decoration-star">⭐</span>
        <span className="decoration-moon">🌙</span>
        <span className="decoration-star">⭐</span>
      </div>
    </div>
  </nav>
);

export default Navigation;