import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaTimes } from "react-icons/fa";
import MenuProfessor from "../../../components/professor/menu/menu";
import reservaService from "../../../services/reservaService";

function ReservasProfessor() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [outras, setOutras] = useState([]);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recupera o usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const professorId = user?.id;

  useEffect(() => {
    if (professorId) {
      carregarReservas();
    }
  }, [professorId]);

  useEffect(() => {
    if (statusFilter === "todos") {
      carregarReservas();
    } else {
      filtrarReservas();
    }
  }, [statusFilter]);

  // Carrega todas as reservas do professor logado e divide em pendentes e outras
  const carregarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      const minhasReservas = await reservaService.getReservasProfessor(professorId);
      separarReservas(minhasReservas);
    } catch (err) {
      console.error("Erro ao carregar reservas:", err);
      setError("Erro ao carregar reservas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Filtra as reservas carregadas conforme busca/status
  const filtrarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      let minhasReservas = await reservaService.getReservasProfessor(professorId);

      // Filtro por status
      if (statusFilter !== "todos") {
        minhasReservas = minhasReservas.filter(r =>
          r.status?.toLowerCase() === statusFilter?.toLowerCase()
        );
      }

      separarReservas(minhasReservas);
    } catch (err) {
      console.error("Erro ao filtrar reservas:", err);
      setError("Erro ao filtrar reservas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Nova função para separar pendentes e outras
  const separarReservas = (dados) => {
    setPendentes(dados.filter(r => r.status?.toLowerCase() === "pendente"));
    setOutras(dados.filter(r => r.status?.toLowerCase() !== "pendente"));
    setReservas(dados); // mantém compatibilidade se necessário
  };

  const handleDetalhes = (id) => {
    navigate(`/professor/reservas/detalhes/${id}`);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "aceita":
      case "aceito":
        return "bg-green-100 text-green-800 uppercase rounded-none";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 uppercase rounded-none";
      case "recusada":
      case "recusado":
        return "bg-red-100 text-red-800 uppercase rounded-none";
      case "cancelada":
      case "cancelado":
        return "bg-gray-100 text-gray-800 uppercase rounded-none";
      default:
        return "bg-gray-100 text-gray-800 uppercase rounded-none";
    }
  };

  const formatarData = (data) => {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHorario = (horario) => {
    if (!horario) return "-";
    return horario.substring(0, 5); // Remove segundos se houver
  };

  // Ajuste para pegar o nome correto do campo de status
  const getStatus = (reserva) => reserva.status || reserva.status_solicitacao || "-";

  // Mostra o nome do espaço corretamente, mesmo se vier aninhado em outros objetos
  const getEspacoNome = (reserva) => {
    // Tenta pegar o nome do espaço em diferentes formatos possíveis
    if (reserva.espaco && reserva.espaco.nome) return reserva.espaco.nome;
    if (reserva.Espaco && reserva.Espaco.nome) return reserva.Espaco.nome;
    if (reserva.nomeEspaco) return reserva.nomeEspaco;
    return "-";
  };
  const getEspacoCodigo = (reserva) => {
    if (reserva.espaco && reserva.espaco.codigoIdentificacao) return reserva.espaco.codigoIdentificacao;
    if (reserva.Espaco && reserva.Espaco.codigoIdentificacao) return reserva.Espaco.codigoIdentificacao;
    if (reserva.codigoIdentificacao) return reserva.codigoIdentificacao;
    return "-";
  };

  // Ajuste para pegar a data de início (data da reserva)
  const getData = (reserva) => reserva.data || reserva.data_inicio || "-";

  // Ajuste para pegar o horário corretamente
  const getHorario = (reserva) => {
    // Se existir horarioInicio/horarioFim, usa eles, senão usa horario único
    if (reserva.horarioInicio && reserva.horarioFim) {
      return `${formatarHorario(reserva.horarioInicio)} - ${formatarHorario(reserva.horarioFim)}`;
    }
    if (reserva.horario) {
      return reserva.horario;
    }
    return "-";
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <MenuProfessor />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <div className="flex flex-row mb-6 gap-4 justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Minhas Reservas ({reservas.length})
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Seção Solicitações Pendentes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-2">Solicitações Pendentes ({pendentes.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-center">Código</th>
                    <th className="px-4 py-3 text-center">Espaço</th>
                    <th className="px-4 py-3 text-center">Data Início</th>
                    <th className="px-4 py-3 text-center">Horário</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pendentes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-gray-500">Nenhuma solicitação pendente.</td>
                    </tr>
                  ) : (
                    pendentes.map((reserva, index) => (
                      <tr
                        key={reserva.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                      >
                        <td className="px-4 py-3 text-center">
                          {getEspacoCodigo(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getEspacoNome(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {formatarData(getData(reserva))}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getHorario(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${getStatusStyle(
                              getStatus(reserva)
                            )}`}
                          >
                            {getStatus(reserva)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleDetalhes(reserva.id)}
                              className="px-4 py-1.5 bg-gray-500 text-white hover:bg-gray-600 transition-colors text-sm font-medium uppercase"
                            >
                              Detalhes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Select de status entre as seções */}
          <div className="flex justify-start mb-8">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 bg-gray-200 text-gray-700 focus:outline-none"
            >
              <option value="todos">Todos os Status</option>
              <option value="aceita">Aceita</option>
              <option value="recusada">Recusada</option>
              <option value="redirecionada">Redirecionada</option>
            </select>
          </div>

          {/* Seção Todas Solicitações */}
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-2">Todas Solicitações ({outras.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-center">Código</th>
                    <th className="px-4 py-3 text-center">Espaço</th>
                    <th className="px-4 py-3 text-center">Data Início</th>
                    <th className="px-4 py-3 text-center">Horário</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {outras.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-gray-500">Nenhuma solicitação encontrada.</td>
                    </tr>
                  ) : (
                    outras.map((reserva, index) => (
                      <tr
                        key={reserva.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                      >
                        <td className="px-4 py-3 text-center">
                          {getEspacoCodigo(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getEspacoNome(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {formatarData(getData(reserva))}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {getHorario(reserva)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${getStatusStyle(
                              getStatus(reserva)
                            )}`}
                          >
                            {getStatus(reserva)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleDetalhes(reserva.id)}
                              className="px-4 py-1.5 bg-gray-500 text-white hover:bg-gray-600 transition-colors text-sm font-medium uppercase"
                            >
                              Detalhes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservasProfessor;