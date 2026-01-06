import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signin from './sample/Signin.jsx';
import Signup from './sample/Signup.jsx';
import RecommendForm from './sample/recommend_sample.jsx';

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
    path: '/recommend',
    element: <RecommendForm />,
  },
  {
    path: '/dashboard',
    element: <div><h1>User Dashboard</h1></div>,
  },
  {
    path: '/admin/dashboard',
    element: <div><h1>Admin Dashboard</h1></div>,
  },
]);
