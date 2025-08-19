import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './styles/mystical-theme.css';    // ✅ Tema principal (sin duplicar .css)

/**
 * 🔮 Componente principal de la aplicación Tarot STEM
 * Portal de entrada a nuestro universo místico-científico del bosque encantado
 */
function App(): React.ReactElement {
  return (
    <div className="App">
      {/* 🧭 Proveedor del router que maneja toda la navegación mística */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;