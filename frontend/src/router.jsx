import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signin from './sample/Signin.jsx';
import Signup from './sample/Signup.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <div><h1>Admin Dashboard</h1></div>,
  },
]);
