import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { CvPage } from './pages/CvPage/Cv.page';
import { HomePage } from './pages/HomePage/Home.page';
// import { OfertaPage } from './pages/OfertaPage/Oferta.page';


const NotFoundRedirect = () => <Navigate to="/" replace />;

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/cv',
    element: <CvPage />,
  },
  // {
  //   path: '/oferta',
  //   children: [
  //     {
  //       index: true,
  //       element: <OfertaPage />,
  //     },
  //     {
  //       path: ':id',
  //       element: <OfertaPage />,
  //     },
  //   ],
  // },
  // {
  //   path: '/zrealizowane-oferty',
  //   children: [
  //     {
  //       index: true,
  //       element: <ZrealizowaneOfertyPage />,
  //     },
  //     {
  //       path: ':id',
  //       element: <ZrealizowaneOfertyPage />,
  //     },
  //   ],
  // },
  // {
  //   path: '/polityka-prywatnosci',
  //   element: <PrivacyPage />,
  // },
  // {
  //   path: '/kontakt',
  //   element: <ContactPage />,
  // },
  // {
  //   path: '*',
  //   element: <NotFoundRedirect />,
  // },
], {
});

export function Router() {
  return <RouterProvider router={router} />;
}
