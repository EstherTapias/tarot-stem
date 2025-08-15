import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout'; // Tu componente Layout existente
import { Home } from '../pages/Home';
import { CardDetail } from '../pages/CardDetail';
import { CardReading } from '../pages/CardReading';

/**
 * 🔮 Configuración del router para la aplicación Tarot STEM
 * 
 * PROBLEMA SOLUCIONADO: El error "No routes matched location '/reading'" 
 * ocurría porque faltaba esta configuración de rutas.
 * 
 * Rutas definidas:
 * - "/" : Home con todas las cartas
 * - "/card/:id" : Detalle de una carta específica  
 * - "/reading" : Página para realizar tirada de cartas
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout principal con Navigation y Footer
    children: [
      {
        index: true, // Ruta por defecto "/"
        element: <Home />,
      },
      {
        path: 'card/:id', // Ruta "/card/:id" 
        element: <CardDetail />,
      },
      {
        path: 'reading', // Ruta "/reading" - ESTO FALTABA!
        element: <CardReading />,
      },
    ],
  },
]);