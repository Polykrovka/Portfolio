import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { CvPage } from './pages/CvPage/Cv.page';
import { HomePage } from './pages/HomePage/Home.page';
import { PersonalPage } from './pages/PersonalPage/Personal.page';


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
  {
    path: '/personal',
    element: <PersonalPage />,
  },
 
  // {
  //   path: '*',
  //   element: <NotFoundRedirect />,
  // },
], {
});

export function Router() {
  return <RouterProvider router={router} />;
}
