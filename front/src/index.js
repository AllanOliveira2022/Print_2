import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
/* Login - Register */
import LoginAdmin from './pages/login/LoginAdmin';
import LoginProf from './pages/login/LoginProf';
import TypeAccount from './pages/register/typeAccount/typeAccount';
import RegisterProf from './pages/register/registerProf/registerProf';
/* Password */
import RecuperarSenha from './pages/password/recuperarSenha/recuperarSenha';
import NovaSenha from './pages/password/novaSenha/novaSenha';
/* Telas Admin */
import EspacosAdmin from './pages/admin/espaçosAdmin/espaçosAdmin';
import CadastrarEspaco from './pages/admin/cadastrarEspaco/cadastrarEspaco';
import SolicitacoesReservaAdmin from "./pages/admin/solicitacoesReservasAdmin/solicitacoesReservasAdmin";
import DetalhesSolicitacao from './pages/admin/solicitacoesReservasAdmin/detalhesSolicitacao/detalhesSolicitacao';
import EditarLaboratorio from "./pages/admin/editarEspaco/editarEspaco";
import ReservasAceitas from './pages/admin/reservasAceitas/reservasAceitas';
/*Telas Professor*/
import EspacosProfessor from './pages/professor/espacosProfessor/espacosProfessor';
import SolicitarReserva from './pages/professor/solicitarReserva/solicitarReserva';
import SolicitacoesProfessor from './pages/professor/solicitacoesProfessor/solicitacoesProfessor';
import PerfilProfessor from './pages/professor/perfilProfessor/perfilProfessor';
/*Telas Gerais*/
import DetalhesEspaço from './pages/admin/detalhesEspaco/detalhesEspaco';
import DetalhesEspacoProf from './pages/professor/detalhesEspaco/detalhesEspaco';
/*Telas Visitante*/
import PagVisitante from './pages/visitante/pagVisitante';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TypeAccount />,
  },
  {
    path: "/login/admin",
    element: <LoginAdmin />,
  },
  {
    path: "/login/professor",
    element: <LoginProf />,
  },
  {
    path: "/register/Professor",
    element: <RegisterProf />,
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
    element: <EspacosAdmin/>
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
    path: "/professor/perfil",
    element: <PerfilProfessor />
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
    path: "/admin/espacos/detalhes/:id",
    element: <DetalhesEspaço/>
  },
  {
    path: "/professor/espacos/detalhes/:id",
    element: <DetalhesEspacoProf/>
  },
  {
    path: "/admin/reservas",
    element: <ReservasAceitas />
  },
  {
    path: "/professor/solicitacoes",
    element: <SolicitacoesProfessor />
  },
  {
    path: "/visitante",
    element: <PagVisitante />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);