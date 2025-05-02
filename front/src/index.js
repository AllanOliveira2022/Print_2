import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/* Login - Register */
import Login from './pages/login/Login';
import TypeAccount from './pages/register/typeAccount/typeAccount';
import RegisterTecLab from './pages/register/registerTecLab/registerTecLab';
import RegisterProf from './pages/register/registerProf/registerProf';
import RegisterEstudante from './pages/register/registerEstudante/registerEstudante';
/* Password */
import RecuperarSenha from './pages/password/recuperarSenha/recuperarSenha';
import NovaSenha from './pages/password/novaSenha/novaSenha';

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
  {
    path: "/register/professor",
    element: <RegisterProf />,
  },
  {
    path: "/register/estudante",
    element: <RegisterEstudante />,
  },
  {
    path: "/recuperarSenha",
    element: <RecuperarSenha />,
  },
  {
    path: "/novaSenha",
    element: <NovaSenha />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);