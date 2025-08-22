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
import EditarLaboratorio from "./pages/admin/editarEspaco/editarEspaco";
import ReservasAdmin from './pages/admin/reservasAdmin/reservasAdmin';
import ProfessoresAdmin from './pages/admin/professoresAdmin/professoresAdmin';
import DetalhesReservaAdmin from "./pages/admin/detalhesReserva/detalhesReserva";
/*Telas Professor*/
import EspacosProfessor from './pages/professor/espacosProfessor/espacosProfessor';
import SolicitarReserva from './pages/professor/solicitarReserva/solicitarReserva';
import PerfilProfessor from './pages/professor/perfilProfessor/perfilProfessor';
import ReservasProfessor from './pages/professor/reservasProfessor/reservasProfessor';
import DetalhesReserva from './pages/professor/detalhesReserva/detalhesReserva';
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
    path: "/professor/solicitarReserva/:professorId/:espacoId",
    element: <SolicitarReserva />
  },
  {
    path: "/professor/reservas",
    element: <ReservasProfessor />
  },
  {
    path: "/professor/reservas/detalhes/:id",
    element: <DetalhesReserva />
  },
  {
    path: "/admin/professores",
    element: <ProfessoresAdmin />
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
    element: <ReservasAdmin />
  },
  {
    path: "/visitante",
    element: <PagVisitante />
  },
  {
    path: "/admin/reservas/detalhes/:id",
    element: <DetalhesReservaAdmin />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);