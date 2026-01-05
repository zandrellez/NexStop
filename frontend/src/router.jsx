import { createBrowserRouter } from 'react-router-dom';
import Signin from './sample/Signin.jsx';
import Signup from './sample/Signup.jsx';

export const router = createBrowserRouter([
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
    element: <div><h1>Admin Dashboard</h1></div>,
  }
]);