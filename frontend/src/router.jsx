import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signin from './sample/Signin.jsx';
import Signup from './sample/Signup.jsx';
<<<<<<< HEAD
import LocationPermission from './sample/LocationPermission.jsx';


// import RecommendForm from '/sample/recommend_sample.jsx';
=======
import AdminDashboard from './sample/AdminDashboard.jsx';
import RecommendForm from './sample/recommend_sample.jsx';
import WaitingScreen from './sample/WaitingScreen.jsx';
import GoScreen from './sample/GoScreen.jsx';
import FeedbackScreen from './sample/FeedbackScreen.jsx';

>>>>>>> 1eeae44bd0b0d7a4c1ba5c663b53eab4d5dcc478

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
<<<<<<< HEAD
    path: '/location-permission',
    element: <LocationPermission />,
=======
    path: '/waiting',
    element: <WaitingScreen />,
  },
  {
    path: '/go',
    element: <GoScreen />,
  },
  {
    path: '/feedback',
    element: <FeedbackScreen />,
  },
  {
    path: '/recommend',
    element: <RecommendForm />,
>>>>>>> 1eeae44bd0b0d7a4c1ba5c663b53eab4d5dcc478
  },
  {
    path: '/dashboard',
    element: <div><h1>User Dashboard</h1></div>,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
]);
