import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.module.css';

/*Componente de navegación-Guía a los usuarios por la aplicación */
const Navigation: React.FC = () => {
  const location = useLocation();

  /*Determina si una ruta está activa*/
  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo y título místico */}
        <Link to="/" className="nav-brand">
          <div className="brand-content">
            <span className="brand-icon">🔮</span>
            <div className="brand-text">
              <h1 className="brand-title gradient-text-accent">Tarot STEM</h1>
              <p className="brand-subtitle">Diosas Contemporáneas</p>
            </div>
          </div>
        </Link>

        {/*Enlaces de navegación */}
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActiveRoute('/') ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Inicio</span>
          </Link>

          <Link 
            to="/lectura" 
            className={`nav-link ${isActiveRoute('/lectura') ? 'nav-link-active' : ''}`}
          >
            <span className="nav-icon">🔮</span>
            <span className="nav-text">Lectura</span>
          </Link>
        </div>

        {/* Información adicional para móvil */}
        <div className="nav-info">
          <span className="nav-tagline">
            ✨ Sabiduría & Ciencia ✨
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;