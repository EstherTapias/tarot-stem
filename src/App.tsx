import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import '../src/styles/mystical-theme.css.css';
import '../src/styles/globals.css';

/**
 * 🔮 Componente principal de la aplicación Tarot STEM
 * Portal de entrada a nuestro universo místico-científico
 */
function App(): React.ReactElement {
  return (
    <div className="App">
      {/* 🌟 Proveedor del router que maneja toda la navegación*/}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;