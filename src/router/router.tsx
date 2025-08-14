// src/router/router.tsx

import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Home } from '../pages/Home';
import { CardDetail } from '../pages/CardDetail';
import { CardReading } from '../pages/CardReading';

/**
 * 🌟 Configuración del router místico
 * Define todos los caminos sagrados de nuestra aplicación
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        // 🏠 Página principal - El santuario de todas las cartas
        index: true,
        element: <Home />,
      },
      {
        // 🎴 Página de detalle de carta - Los secretos de cada arcano
        path: '/card/:id',
        element: <CardDetail />,
      },
      {
        // 🔮 Página de lectura de cartas - El ritual de las tres cartas
        path: '/lectura',
        element: <CardReading />,
      }
    ]
  }
]);