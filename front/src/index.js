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
/* Telas Admin */
import LabsAdmin from './pages/admin/espaçosAdmin/espaçosAdmin';
import CadastrarEspaco from './pages/admin/cadastrarEspaco/cadastrarEspaco';
import SolicitacoesReservaAdmin from "./pages/admin/solicitacoesReservasAdmin/solicitacoesReservasAdmin";
import DetalhesSolicitacao from './pages/admin/solicitacoesReservasAdmin/detalhesSolicitacao/detalhesSolicitacao';
import EditarLaboratorio from "./pages/admin/editarEspaco/editarEspaco";
import ReservasAceitas from './pages/admin/reservasAceitas/reservasAceitas';
/*Telas Professor*/
import EspacosProfessor from './pages/professor/espacosProfessor/espacosProfessor';
import SolicitarReserva from './pages/professor/solicitarReserva/solicitarReserva';
import SolicitacoesProfessor from './pages/professor/solicitacoesProfessor/solicitacoesProfessor';

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
  {
    path: "/admin/espacos",
    element: <LabsAdmin/>
  },
  {
    path: "/admin/espacos/cadastrar",
    element: <CadastrarEspaco />
  },
  {
    path: "/professor/espacos",
    element: <EspacosProfessor />
  },
  {
    path: "/professor/solicitarReserva",
    element: <SolicitarReserva />
  },
  {
    path: "/admin/solicitacoes",
    element: <SolicitacoesReservaAdmin />
  },
  {
    path: "/admin/solicitacoes/:id",
    element: <DetalhesSolicitacao />
  },
  {
    path: "/admin/espacos/editar/:id",
    element: <EditarLaboratorio />
  },
  {
    path: "/admin/reservas",
    element: <ReservasAceitas />
  },
  {
    path: "/professor/solicitacoes",
    element: <SolicitacoesProfessor />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);