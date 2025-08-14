import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/*Punto de entrada principal de la aplicación*/

// Encontramos el elemento raíz en el DOM
const rootElement = document.getElementById('root');

if (!rootElement) {
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