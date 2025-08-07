import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaTimes } from "react-icons/fa";
import MenuProfessor from "../../../components/professor/menu/menu";
import reservaService from "../../../services/reservaService";

function ReservasProfessor() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (searchTerm.trim() === "" && statusFilter === "todos") {
      carregarReservas();
    } else {
      filtrarReservas();
    }
  }, [searchTerm, statusFilter]);

  const carregarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      const dados = await reservaService.getReservasProfessor(professorId);
      setReservas(dados);
    } catch (err) {
      console.error("Erro ao carregar reservas:", err);
      setError("Erro ao carregar reservas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarReservas = async () => {
    try {
      setLoading(true);
      setError(null);
      let dados;

      if (statusFilter !== "todos") {
        dados = await reservaService.getReservasProfessorPorStatus(professorId, statusFilter);
      } else {
        dados = await reservaService.getReservasProfessor(professorId);
      }

      // Filtro local por termo de busca
      if (searchTerm.trim() !== "") {
        dados = dados.filter(reserva =>
          reserva.espaco?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reserva.espaco?.codigoIdentificacao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reserva.data?.includes(searchTerm)
        );
      }

      setReservas(dados);
    } catch (err) {
      console.error("Erro ao filtrar reservas:", err);
      setError("Erro ao filtrar reservas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetalhes = (id) => {
    navigate(`/professor/reservas/detalhes/${id}`);
  };

  const handleCancelar = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      try {
        await reservaService.cancelarReserva(id);
        alert("Reserva cancelada com sucesso!");
        carregarReservas();
      } catch (err) {
        console.error("Erro ao cancelar reserva:", err);
        alert("Erro ao cancelar reserva. Tente novamente.");
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "aceita":
      case "aceito":
        return "bg-green-100 text-green-800";
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "recusada":
      case "recusado":
        return "bg-red-100 text-red-800";
      case "cancelada":
      case "cancelado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const limparFiltros = () => {
    setSearchTerm("");
    setStatusFilter("todos");
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

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-2/5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar por espaço, código ou data"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600 focus:border-none"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-none"
            >
              <option value="todos">Todos os Status</option>
              <option value="pendente">Pendente</option>
              <option value="aceita">Aceita</option>
              <option value="recusada">Recusada</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <button
              onClick={limparFiltros}
              className="w-full sm:w-auto px-4 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Limpar Filtros
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Carregando reservas...</p>
            </div>
          ) : reservas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">
                {searchTerm || statusFilter !== "todos"
                  ? "Nenhuma reserva encontrada com os filtros aplicados."
                  : "Você ainda não possui reservas."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-center">Código</th>
                    <th className="px-4 py-3 text-center">Espaço</th>
                    <th className="px-4 py-3 text-center">Data</th>
                    <th className="px-4 py-3 text-center">Horário</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    >
                      <td className="px-4 py-3 text-center">
                        {reserva.espaco?.codigoIdentificacao || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {reserva.espaco?.nome || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {formatarData(reserva.data)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {formatarHorario(reserva.horarioInicio)} - {formatarHorario(reserva.horarioFim)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getStatusStyle(
                            reserva.status
                          )}`}
                        >
                          {reserva.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleDetalhes(reserva.id)}
                            className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium"
                            title="Ver detalhes"
                          >
                            <FaEye />
                          </button>
                          {(reserva.status?.toLowerCase() === "pendente" || 
                            reserva.status?.toLowerCase() === "aceita") && (
                            <button
                              onClick={() => handleCancelar(reserva.id)}
                              className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm font-medium"
                              title="Cancelar reserva"
                            >
                              <FaTimes />
                            </button>
                          )}
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

export default ReservasProfessor;