import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './styles/mystical-theme.css';   

/*🔮 Componente principal de la aplicación Tarot STEM */
function App(): React.ReactElement {
  return (
    <div className="App">
      {/* 🧭 Proveedor del router que maneja toda la navegación mística */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
