import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signin from './sample/Signin.jsx';
import Signup from './sample/Signup.jsx';
import Home from './sample/Home.jsx';
import LocationPermission from './sample/LocationPermission.jsx';
import AdminDashboard from './sample/AdminDashboard.jsx';
import RecommendForm from './sample/recommend_sample.jsx';
import WaitingScreen from './sample/WaitingScreen.jsx';
import GoScreen from './sample/GoScreen.jsx';
import FeedbackScreen from './sample/FeedbackScreen.jsx';


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
    path: '/home',
    element: <Home />,
  },
  {
    path: '/location-permission',
    element: <LocationPermission />,
  },
  {
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
