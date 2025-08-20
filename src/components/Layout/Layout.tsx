import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';
// 👇 Importamos los iconos de react-icons
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      {/* 🔮 Navegación */}
      <Navigation />
      
      {/* 📱 Contenido principal */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>

      {/* 🌌 Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          
          <div className={styles.footerDivider}></div>
          
          <div className={styles.footerContent}>
            <div className={styles.footerMain}>
              <div className={styles.footerLogo}>
                <span className={styles.footerIcon}></span>
                <span className={styles.footerTitle}>Aethra TAROT</span>
              </div>
              <p className={styles.footerDescription}>
                 Conectando la sabiduría ancestral con la ciencia moderna 
              </p>
            </div>
            
            {/* Enlaces sociales */}
            <div className={styles.socialLinks}>
              <a 
                href="https://www.linkedin.com/in/esther-tapias-paez-camino/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
              
              <a 
                href="https://github.com/EstherTapias" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialIcon}
                title="GitHub"
              >
                <FaGithub />
              </a>
            </div>
            
            <div className={styles.footerSignature}>
              <p className={styles.signatureText}>
                Creado con 💜 para celebrar a las Diosas Contemporáneas de STEM    ·    Realizado por Esther Tapias.
              </p>
            </div>
          </div>


        </div>
      </footer>
    </div>
  );
};

export default Layout;
