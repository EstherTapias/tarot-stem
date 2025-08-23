import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.module.css";
// Importación de iconos sociales
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { SelectedCard } from "../../types/tarot";

export type ReadingOutletContext = {
  selectedCards: SelectedCard[];
  setSelectedCards: React.Dispatch<React.SetStateAction<SelectedCard[]>>;
  isComplete: boolean;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const Layout: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Navegación superior */}
      <Navigation />

      {/* Contenido principal donde se inyecta el Outlet de rutas */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <Outlet
            context={
              {
                selectedCards,
                setSelectedCards,
                isComplete,
                setIsComplete,
              } as ReadingOutletContext
            }
          />
        </div>
      </main>

      {/* Pie de página místico con contenido y vínculos sociales */}
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

            {/* Texto firma */}
            <div className={styles.footerSignature}>
              <p className={styles.signatureText}>
                Creado con 💜 para celebrar a las Diosas Contemporáneas de STEM
                   ·    Realizado por Esther Tapias.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;