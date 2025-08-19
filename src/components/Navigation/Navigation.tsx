import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * 🔮 Navigation Component - Limpio y Místico
 * 
 * CARACTERÍSTICAS:
 * ✅ Navegación limpia (Home, Tirada, Acerca de)
 * ✅ Indicador de página activa
 * ✅ Efectos hover encantados
 * ✅ Logo místico
 */

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        {/* 🔮 Logo Místico */}
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>🔮</div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>Tarot</span>
              <span className={styles.logoSub}>STEM</span>
            </div>
          </Link>
        </div>

        {/* 🧭 Menú Principal */}
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActiveRoute('/') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>🏠</span>
              <span className={styles.navText}>Home</span>
              <div className={styles.navIndicator}></div>
            </Link>
          </li>
          
          <li className={styles.navItem}>
            <Link 
              to="/reading" 
              className={`${styles.navLink} ${isActiveRoute('/reading') ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>🃏</span>
              <span className={styles.navText}>Tirada</span>
              <div className={styles.navIndicator}></div>
            </Link>
          </li>         
          
        </ul>

        {/* 🌟 Efectos Mágicos */}
        <div className={styles.magicalEffects}>
          <div className={styles.starParticle}>✨</div>
          <div className={styles.moonParticle}>🌙</div>
          <div className={styles.crystalParticle}>💎</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;