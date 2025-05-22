import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Menu from "../../../components/tecLab/menu/menu";

function SolicitacoesReservaAdmin() {
  const navigate = useNavigate();

  const solicitacoes = [
    {
      id: 1,
      nomeProfessor: "João Silva",
      laboratorio: "Lab de Informática",
      dataHora: "2025-05-20 14:00",
      situacao: "Pendente",
      descricao: "Solicitação para uso do laboratório para aula prática.",
    },
    {
      id: 2,
      nomeProfessor: "Maria Souza",
      laboratorio: "Lab de Química",
      dataHora: "2025-05-21 09:00",
      situacao: "Aprovada",
      descricao: "Solicitação para pesquisa em grupo.",
    },
    {
      id: 3,
      nomeProfessor: "Carlos Lima",
      laboratorio: "Lab de Física",
      dataHora: "2025-05-22 11:00",
      situacao: "Recusada",
      descricao: "Solicitação não aprovada devido à manutenção.",
    },
  ];

  const handleDetalhes = (id) => {
    navigate(`/admin/solicitacoes/${id}`);
  };

  // Função que retorna as classes para o badge conforme a situação
  const getBadgeClasses = (situacao) => {
    switch (situacao) {
      case "Pendente":
        return "bg-yellow-500 text-yellow-900";
      case "Aprovada":
        return "bg-green-500 text-green-900";
      case "Recusada":
        return "bg-red-500 text-red-900";
      default:
        return "bg-gray-500 text-gray-900";
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <div className="flex flex-col mb-6 gap-4">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Solicitações de Reserva
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-8">
            <div className="w-full sm:w-2/5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar solicitações..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
              />
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0 font-medium">
              <button className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors">
                Filtrar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Professor</th>
                  <th className="px-4 py-3">Laboratório</th>
                  <th className="px-4 py-3">Data e Hora</th>
                  <th className="px-4 py-3">Situação</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {solicitacoes.map((sol, index) => (
                  <tr
                    key={sol.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="px-4 py-3">{sol.id}</td>
                    <td className="px-4 py-3">{sol.nomeProfessor}</td>
                    <td className="px-4 py-3">{sol.laboratorio}</td>
                    <td className="px-4 py-3">{sol.dataHora}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeClasses(
                          sol.situacao
                        )}`}
                      >
                        {sol.situacao}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() => handleDetalhes(sol.id)}
                          className="px-4 py-1 bg-gray-500 text-white hover:bg-gray-600 transition-colors font-medium"
                        >
                          Detalhes
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolicitacoesReservaAdmin;