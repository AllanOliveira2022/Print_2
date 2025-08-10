import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Menu from "../../../components/tecLab/menu/menu";
import reservaService from "../../../services/reservaService";

function SolicitacoesReservaAdmin() {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      carregarSolicitacoes();
    } else {
      filtrarSolicitacoes();
    }
  }, [searchTerm]);

  const carregarSolicitacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await reservaService.listarSolicitacoes();
      setSolicitacoes(dados);
    } catch (err) {
      console.error("Erro ao carregar solicitações:", err);
      setError("Erro ao carregar solicitações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarSolicitacoes = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await reservaService.listarSolicitacoes();
      
      // Filtro local por termo de busca
      const dadosFiltrados = dados.filter(solicitacao =>
        solicitacao.usuario?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitacao.espaco?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solicitacao.data_inicio?.includes(searchTerm)
      );
      
      setSolicitacoes(dadosFiltrados);
    } catch (err) {
      console.error("Erro ao filtrar solicitações:", err);
      setError("Erro ao filtrar solicitações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetalhes = (id) => {
    navigate(`/admin/solicitacoes/${id}`);
  };

  // Função que retorna as classes para o badge conforme a situação
  const getBadgeClasses = (situacao) => {
    switch (situacao?.toLowerCase()) {
      case "pendente":
        return "bg-yellow-500 text-yellow-900";
      case "aceita":
      case "aceito":
        return "bg-green-500 text-green-900";
      case "recusada":
      case "recusado":
        return "bg-red-500 text-red-900";
      case "redirecionada":
      case "redirecionado":
        return "bg-blue-500 text-blue-900";
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
              Solicitações de Reserva ({solicitacoes.length})
            </h1>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-8">
            <div className="w-full sm:w-2/5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar solicitações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
              />
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0 font-medium">
              <button 
                onClick={() => setSearchTerm("")}
                className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Carregando solicitações...</p>
            </div>
          ) : solicitacoes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">
                {searchTerm
                  ? "Nenhuma solicitação encontrada para sua pesquisa."
                  : "Nenhuma solicitação encontrada."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Professor</th>
                    <th className="px-4 py-3">Espaço</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Horário</th>
                    <th className="px-4 py-3">Situação</th>
                    <th className="px-4 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitacoes.map((solicitacao, index) => (
                    <tr
                      key={solicitacao.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    >
                      <td className="px-4 py-3">{solicitacao.id}</td>
                      <td className="px-4 py-3">{solicitacao.usuario?.nome || 'N/A'}</td>
                      <td className="px-4 py-3">{solicitacao.espaco?.nome || 'N/A'}</td>
                      <td className="px-4 py-3">{solicitacao.data_inicio}</td>
                      <td className="px-4 py-3">{solicitacao.horario}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeClasses(
                            solicitacao.status
                          )}`}
                        >
                          {solicitacao.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => handleDetalhes(solicitacao.id)}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SolicitacoesReservaAdmin;