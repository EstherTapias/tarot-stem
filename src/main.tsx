import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/* Punto de entrada principal de la aplicación */

// Encontramos el elemento raíz en el DOM donde se montará React
const rootElement = document.getElementById('root');

if (!rootElement) {
  // Lanzamos error si no se encuentra el div raíz para montar la app
  throw new Error('🚨 ¡El elemento raíz no fue encontrado! El portal no puede abrirse.');
}

// Creamos la raíz de React y renderizamos nuestra aplicación mística
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* 🔮 Invocamos el componente principal del Tarot STEM */}
    <App />
  </React.StrictMode>
);
