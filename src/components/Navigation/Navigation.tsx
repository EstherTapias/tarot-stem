import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className="mystical-nav">
      {/* Logo y título principal con efecto brillante */}
      <div className="nav-brand">
        <div className="nav-logo">🔮</div>
        <h1 className="nav-title glowing-text">Tarot STEM</h1>
        <p className="nav-subtitle">Diosas Contemporáneas</p>
      </div>

      {/* Enlaces de navegación con efectos hover */}
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `nav-link mystical-hover ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">🃏</span>
          <span>Todas las Cartas</span>
        </NavLink>

        <NavLink 
          to="/reading" 
          className={({ isActive }) => 
            `nav-link mystical-hover ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">✨</span>
          <span>Tirada de Cartas</span>
        </NavLink>
      </div>

      {/* Decoración mística adicional */}
      <div className="nav-decoration">
        <span className="decoration-star">⭐</span>
        <span className="decoration-moon">🌙</span>
        <span className="decoration-star">⭐</span>
      </div>
    </nav>
  );
};

export default Navigation;