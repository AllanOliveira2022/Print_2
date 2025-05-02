import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/Login';
import TypeAccount from './pages/register/typeAccount/typeAccount';
import RegisterTecLab from './pages/register/registerTecLab/registerTecLab';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/select-account",
    element: <TypeAccount />,
  },
  {
    path: "/register/tecnico",
    element: <RegisterTecLab />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);