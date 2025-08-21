import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout'; 
import { Home } from '../pages/Home';
import { CardDetail } from '../pages/CardDetail';
import { CardReading } from '../pages/CardReading';

/**
 * Configuración del router para la aplicación Tarot STEM 
 * Rutas definidas:
 * - "/" : Página principal Home con todas las cartas
 * - "/card/:id" : Página detalle para mostrar información de una carta específica
 * - "/reading" : Página para realizar la tirada de cartas
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Componente Layout que incluye Navigation y Footer
    children: [
      {
        index: true, // Ruta por defecto con path "/" que carga Home
        element: <Home />,
      },
      {
        path: 'card/:id', // Ruta dinámica para detalle de la carta por id
        element: <CardDetail />,
      },
      {
        path: 'reading', // Ruta para la página de tirada de cartas
        element: <CardReading />,
      },
    ],
  },
]);
