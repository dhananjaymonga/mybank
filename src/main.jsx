import { createRoot } from 'react-dom/client';

import App from './App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Transactions from './Transactions';
import Signup from './Signup';
import Login from './Login';
import VerifyEmail from './VerifyEmail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/history',
    element: <Transactions />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/verify/',
    element: <VerifyEmail />
  }
])

const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />)