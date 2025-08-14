import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Layout.module.css';

/**
 * Estructura base que envuelve todas las páginas de la app
 */
const Layout: React.FC = () => {
  return (
    <div className="layout">
      {/* Barra de navegación */}
      <Navigation />

      {/* Contenedor principal */}
      <main className="main-content">
        <div className="container">
          {/* Aquí se renderiza el contenido de cada ruta hija */}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="text-center">
            ✨ Tarot STEM - Conectando la sabiduría ancestral con la ciencia moderna ✨
          </p>
          <p className="text-center text-cosmic">
            Creado con 💜 para celebrar a las Diosas Contemporáneas de STEM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
