import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Home } from '../pages/Home';
import { CardDetail } from '../pages/CardDetail';
import { CardReading } from '../pages/CardReading';

/*Define todos las rutas de nuestra aplicación */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        //Página principal 
        index: true,
        element: <Home />,
      },
      {
        //Página de detalle de carta 
        path: '/carta/:id',
        element: <CardDetail />,
      },
      {
        //Página de lectura de 3 cartas
        path: '/lectura',
        element: <CardReading />,
      }
    ]
  }
]);