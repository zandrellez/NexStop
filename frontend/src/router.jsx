import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Signin from './sample/Signin_sample.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <><h1>Dashboard Page</h1></>,
  },
  {
    path: '/signin',
    element: <Signin />,
  }
]);