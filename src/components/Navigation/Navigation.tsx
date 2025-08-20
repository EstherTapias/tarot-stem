import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * 🔮 Navigation Component - Más Disruptivo y Bonito
 * 
 * CARACTERÍSTICAS:
 * ✅ Navegación disruptiva pero elegante
 * ✅ Efectos más llamativos respetando la estética
 * ✅ Indicador de página activa mejorado
 * ✅ Efectos hover más impactantes
 * ✅ Logo místico con más personalidad
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
        {/* 🔮 Logo Místico Mejorado */}
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoIconContainer}>
              <div className={styles.logoIcon}>🔮</div>
              <div className={styles.logoGlow}></div>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>Aethra</span>
              <span className={styles.logoSub}>TAROT</span>
            </div>
          </Link>
        </div>

        {/* 🧭 Menú Principal Disruptivo */}
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActiveRoute('/') ? styles.active : ''}`}
            >
              <div className={styles.navIconContainer}>
                <span className={styles.navIcon}>🏠</span>
                <div className={styles.iconPulse}></div>
              </div>
              <span className={styles.navText}>Home</span>
              <div className={styles.navIndicator}></div>
              <div className={styles.navRipple}></div>
            </Link>
          </li>
          
          <li className={styles.navItem}>
            <Link 
              to="/reading" 
              className={`${styles.navLink} ${isActiveRoute('/reading') ? styles.active : ''}`}
            >
              <div className={styles.navIconContainer}>
                <span className={styles.navIcon}>🃏</span>
                <div className={styles.iconPulse}></div>
              </div>
              <span className={styles.navText}>Tirada</span>
              <div className={styles.navIndicator}></div>
              <div className={styles.navRipple}></div>
            </Link>
          </li>         
        </ul>

        {/* 🌟 Efectos Mágicos Potenciados */}
        <div className={styles.magicalEffects}>
          <div className={styles.cosmicDust}></div>
          <div className={styles.energyWave}></div>
        </div>

        {/* 🎭 Elemento Decorativo Central */}
        <div className={styles.centerDecoration}>
          <div className={styles.mysticalOrb}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;0.





