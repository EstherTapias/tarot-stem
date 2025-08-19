import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

/**
 * 🔮 Layout Component con Footer Místico
 * 
 * CARACTERÍSTICAS:
 * ✅ Navegación limpia integrada
 * ✅ Footer sencillo y místico
 * ✅ Estructura responsive
 * ✅ Efectos visuales coherentes
 */

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* 🔮 Navegación mística */}
      <Navigation />

      {/* 📱 Contenido principal */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      {/* 🌌 Footer Místico */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          {/* Línea divisoria sutil */}
          <div className={styles.footerDivider}></div>
          
          {/* Contenido principal del footer */}
          <div className={styles.footerContent}>
            <div className={styles.footerMain}>
              <div className={styles.footerLogo}>
                <span className={styles.footerIcon}>🔮</span>
                <span className={styles.footerTitle}>Tarot STEM</span>
              </div>
              
              <p className={styles.footerDescription}>
                ✨ Conectando la sabiduría ancestral con la ciencia moderna ✨
              </p>
            </div>
            
            {/* Enlaces sociales */}
            <div className={styles.socialLinks}>
              <a 
                href="https://www.linkedin.com/in/esther-tapias-paez-camino/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="LinkedIn"
              >
                <span className={styles.socialIcon}>💼</span>
                <span className={styles.socialText}>LinkedIn</span>
              </a>
              
              <a 
                href="https://github.com/EstherTapias" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="GitHub"
              >
                <span className={styles.socialIcon}>👩‍💻</span>
                <span className={styles.socialText}>GitHub</span>
              </a>
            </div>
            
            <div className={styles.footerSignature}>
              <p className={styles.signatureText}>
                Creado con 💜 para celebrar a las Diosas Contemporáneas de STEM
              </p>
            </div>
          </div>
          
          {/* Efectos decorativos */}
          <div className={styles.footerEffects}>
            <div className={styles.mysticalParticle}>✨</div>
            <div className={styles.cosmicParticle}>🌟</div>
            <div className={styles.energyParticle}>💫</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;