import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Home } from '../pages/Home';
import { CardDetail } from '../pages/CardDetail';
import { CardReading } from '../pages/CardReading';

/**
 * Definición de todas las rutas de la aplicación
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Página principal (index)
      {
        index: true,
        element: <Home />,
      },
      // Página de detalle de carta (ruta relativa)
      {
        path: 'carta/:id',
        element: <CardDetail />,
      },
      // Página de lectura de 3 cartas (ruta relativa)
      {
        path: 'lectura',
        element: <CardReading />,
      },
    ],
  },
]);