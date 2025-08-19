import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTimes, FaCalendar, FaClock, FaMapMarkerAlt, FaUser, FaInfoCircle } from "react-icons/fa";
import MenuProfessor from "../../../components/professor/menu/menu";
import reservaService from "../../../services/reservaService";
import professorService from "../../../services/professorService";

function DetalhesReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarDetalhesReserva();
    // eslint-disable-next-line
  }, [id]);

  const carregarDetalhesReserva = async () => {
    try {
      setLoading(true);
      setError(null);
      let dados;
      try {
        dados = await reservaService.getDetalhesReserva(id);
      } catch (err) {
        // fallback busca local
        if (
          (err.message && err.message.includes("404")) ||
          (err.response && err.response.status === 404) ||
          (err.message && err.message.toLowerCase().includes("not found"))
        ) {
          const user = JSON.parse(localStorage.getItem("user"));
          const professorId = user?.id;
          if (professorId) {
            const todas = await reservaService.getReservasProfessor(professorId);
            dados = todas.find(r => String(r.id) === String(id));
          }
        }
        if (!dados) throw err;
      }
      setReserva(dados);

      // Busca informações do professor se não vierem completas
      let profObj = null;
      if (dados.professor && dados.professor.nome && dados.professor.codigoInstitucional) {
        profObj = dados.professor;
      } else if (dados.Usuario && dados.Usuario.id) {
        // Sequelize pode retornar como Usuario
        try {
          const profDetalhes = await professorService.buscarPorId(dados.Usuario.id);
          profObj = {
            nome: profDetalhes.nome,
            codigoInstitucional: profDetalhes.Professor?.codigo_institucional || "-"
          };
        } catch {
          profObj = { nome: "-", codigoInstitucional: "-" };
        }
      } else if (dados.professorId) {
        try {
          const profDetalhes = await professorService.buscarPorId(dados.professorId);
          profObj = {
            nome: profDetalhes.nome,
            codigoInstitucional: profDetalhes.Professor?.codigo_institucional || "-"
          };
        } catch {
          profObj = { nome: "-", codigoInstitucional: "-" };
        }
      }
      setProfessor(profObj);

    } catch (err) {
      console.error("Erro ao carregar detalhes da reserva:", err);
      setError("Erro ao carregar detalhes da reserva. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async () => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      try {
        await reservaService.cancelarReserva(id);
        alert("Reserva cancelada com sucesso!");
        navigate("/professor/reservas");
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
        return "bg-green-100 text-green-800 border-green-300 uppercase rounded-none";
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 uppercase rounded-none";
      case "recusada":
      case "recusado":
        return "bg-red-100 text-red-800 border-red-300 uppercase rounded-none";
      case "cancelada":
      case "cancelado":
        return "bg-gray-100 text-gray-800 border-gray-300 uppercase rounded-none";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 uppercase rounded-none";
    }
  };

  const formatarData = (data) => {
    if (!data) return "-";
    // Suporta formatos ISO e yyyy-mm-dd
    if (data.includes("T")) {
      // ISO: "2024-05-30T17:41:23.000Z"
      const d = new Date(data);
      if (!isNaN(d)) {
        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        return `${dia}/${mes}/${ano}`;
      }
    }
    // yyyy-mm-dd
    const [ano, mes, dia] = data.split("-").map(Number);
    if (ano && mes && dia) {
      return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}`;
    }
    return data;
  };

  const formatarHorario = (horario) => {
    if (!horario) return "";
    return horario.substring(0, 5);
  };

  const formatarDiasSemana = (dias) => {
    if (!dias) return "-";
    if (Array.isArray(dias)) return dias.join(", ");
    if (typeof dias === "string") return dias.split(",").map(d => d.trim()).join(", ");
    return dias;
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <MenuProfessor />
        <div className="flex justify-center w-full p-4 md:p-8">
          <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Carregando detalhes da reserva...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !reserva) {
    return (
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <MenuProfessor />
        <div className="flex justify-center w-full p-4 md:p-8">
          <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
            <div className="text-center py-8">
              <p className="text-red-600 text-lg">{error || "Reserva não encontrada."}</p>
              <button
                onClick={() => navigate("/professor/reservas")}
                className="mt-4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Voltar para Reservas
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <MenuProfessor />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/professor/reservas")}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-green-800">
                Detalhes da Reserva
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(
                  reserva.status
                )}`}
              >
                {reserva.status}
              </span>
            </div>
          </div>

          {/* Informações da Reserva */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Informações do Espaço */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                Informações do Espaço
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Código:</label>
                  <p className="text-gray-800">
                    {reserva.espaco?.codigoIdentificacao ||
                     reserva.Espaco?.codigoIdentificacao ||
                     reserva.codigoIdentificacao ||
                     "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome:</label>
                  <p className="text-gray-800">
                    {reserva.espaco?.nome ||
                     reserva.Espaco?.nome ||
                     reserva.nomeEspaco ||
                     "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Bloco:</label>
                  <p className="text-gray-800">
                    {reserva.espaco?.bloco?.nome ||
                     reserva.Espaco?.bloco?.nome ||
                     reserva.nomeBloco ||
                     "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo:</label>
                  <p className="text-gray-800">
                    {reserva.espaco?.Tipo?.nome ||
                     reserva.Espaco?.Tipo?.nome ||
                     reserva.nomeTipo ||
                     "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Capacidade:</label>
                  <p className="text-gray-800">
                    {reserva.espaco?.capacidade ||
                     reserva.Espaco?.capacidade ||
                     reserva.capacidade ||
                     "-"} pessoas
                  </p>
                </div>
              </div>
            </div>

            {/* Informações da Reserva */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendar className="text-green-600" />
                Informações da Reserva
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Tipo de Reserva:</label>
                  <p className="text-gray-800">{reserva.tipo === "recorrente" ? "Recorrente" : "Única"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Início:</label>
                  <p className="text-gray-800">{formatarData(reserva.data_inicio || reserva.data || reserva.dataInicio)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Fim:</label>
                  <p className="text-gray-800">
                    {reserva.tipo === "recorrente"
                      ? formatarData(reserva.data_fim || reserva.dataFim)
                      : formatarData(reserva.data_inicio || reserva.data || reserva.dataInicio)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Dias da Semana:</label>
                  <p className="text-gray-800">
                    {reserva.tipo === "recorrente"
                      ? formatarDiasSemana(reserva.dias_semana || reserva.diasSemana)
                      : formatarDiasSemana(reserva.dias_semana || reserva.diasSemana)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Turno:</label>
                  <p className="text-gray-800">{reserva.turno || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Horário:</label>
                  <p className="text-gray-800">
                    {formatarHorario(reserva.horarioInicio || reserva.horario_inicio || reserva.horario)} - {formatarHorario(reserva.horarioFim || reserva.horario_fim)}
                  </p>
                </div>
                <div className="hidden">
                  <label className="text-sm font-medium text-gray-600">Duração:</label>
                  <p className="text-gray-800">
                    {reserva.duracao || "Calculada automaticamente"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Solicitação:</label>
                  <p className="text-gray-800">{formatarData(reserva.dataSolicitacao || reserva.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-green-600" />
              Informações Adicionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Professor:</label>
                <p className="text-gray-800">
                  {professor?.nome ||
                    reserva.professor?.nome ||
                    reserva.Usuario?.nome ||
                    "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Código Institucional:</label>
                <p className="text-gray-800">
                  {professor?.codigoInstitucional ||
                    reserva.professor?.codigoInstitucional ||
                    reserva.professor?.codigo_institucional ||
                    reserva.Usuario?.Professor?.codigo_institucional ||
                    "-"}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Justificativa:</label>
                <p className="text-gray-800 mt-1">
                  {reserva.justificativa || "Nenhuma justificativa fornecida."}
                </p>
              </div>
              {reserva.observacoes && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Observações:</label>
                  <p className="text-gray-800 mt-1">{reserva.observacoes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Histórico de Status (se disponível) */}
          {reserva.historicoStatus && reserva.historicoStatus.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Status</h2>
              <div className="space-y-3">
                {reserva.historicoStatus.map((historico, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusStyle(historico.status)}`}>
                        {historico.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatarData(historico.data)} às {formatarHorario(historico.horario)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalhesReserva;