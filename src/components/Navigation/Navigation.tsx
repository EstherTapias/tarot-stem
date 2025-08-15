import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.module.css';

/**
 * 🧭 Navigation Component MEJORADO
 * 
 * NUEVAS FUNCIONALIDADES:
 * ✅ Añadidos los 4 elementos místicos (Fuego, Agua, Tierra, Aire)
 * ✅ Mejor estructura de elementos decorativos
 * ✅ Tooltips informativos en elementos
 * ✅ Mantenido el diseño original pero mejorado
 */
const Navigation: React.FC = () => (
  <nav className="mystical-nav">
    {/* 🔮 Sección de marca (sin cambios) */}
    <div className="nav-brand">
      <div className="nav-logo">🔮</div>
      <div className="nav-text">
        <h1 className="nav-title glowing-text">Tarot STEM</h1>
        <p className="nav-subtitle">Diosas Contemporáneas</p>
      </div>
    </div>

    {/* 🔗 Enlaces de navegación (sin cambios) */}
    <div className="nav-links">
      <NavLink to="/" className={({ isActive }) => `nav-link mystical-hover ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">🃏</span>
        Todas las Cartas
      </NavLink>
      <NavLink to="/reading" className={({ isActive }) => `nav-link mystical-hover ${isActive ? 'active' : ''}`}>
        <span className="nav-icon">✨</span>
        Tirada de Cartas
      </NavLink>
    </div>

    {/* 🌟 MEJORADO: Elementos místicos + decoración */}
    <div className="nav-decoration">
      {/* 🔥💧🌱💨 Los 4 elementos místicos */}
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

      {/* ⭐🌙⭐ Decoración celestial original */}
      <div className="celestial-decoration">
        <span className="decoration-star">⭐</span>
        <span className="decoration-moon">🌙</span>
        <span className="decoration-star">⭐</span>
      </div>
    </div>
  </nav>
);

export default Navigation;