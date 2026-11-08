import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { CvPage } from './pages/CvPage/Cv.page';
import { HomePage } from './pages/HomePage/Home.page';
import { PersonalPage } from './pages/PersonalPage/Personal.page';
import { ToolsPage } from './pages/ToolsPage/Tools.page';


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
  {
    path: '/tools',
    element: <ToolsPage />,
  },
 
  // {
  //   path: '*',
  //   element: <NotFoundRedirect />,
  // },
], {
  basename: import.meta.env.BASE_URL,
});

export function Router() {
  return <RouterProvider router={router} />;
}
