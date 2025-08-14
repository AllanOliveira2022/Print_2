import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/professor/menu/menu";
import espacoService from "../../../services/espacoService.js";
import reservaService from "../../../services/reservaService.js";
import Message from "../../../components/Message/Message";

function ReservarLaboratorio() {
  const { professorId, espacoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    laboratorio: "",
    dataReserva: "",
    turno: "",
    horario: "",
    infoAdicionais: "",
  });

  const [espacoInfo, setEspacoInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingEspaco, setLoadingEspaco] = useState(true);
  const [errorEspaco, setErrorEspaco] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // Novo estado para mensagens

  useEffect(() => {
  const fetchEspaco = async () => {
    try {
      const espaco = await espacoService.buscarPorId(espacoId);
      setEspacoInfo(espaco);

      setFormData((prevFormData) => ({
        ...prevFormData,
        usuario: professorId, // ID do professor vindo da URL
        laboratorio: espaco.nome, // Nome do laboratório
      }));
    } catch (err) {
      setErrorEspaco(err.message || "Erro ao carregar informações do espaço.");
      console.error(err);
    } finally {
      setLoadingEspaco(false);
    }
  };

  if (espacoId && professorId) {
    fetchEspaco();
  } else {
    setErrorEspaco("IDs do professor ou do espaço não encontrados na URL.");
    setLoadingEspaco(false);
  }
}, [professorId, espacoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.usuario.trim()) newErrors.usuario = "Identificação é obrigatória";
    if (!formData.dataReserva) newErrors.dataReserva = "Data é obrigatória";
    if (!formData.turno) newErrors.turno = "Turno é obrigatório";
    if (!formData.horario) newErrors.horario = "Horário é obrigatório";

    if (formData.dataReserva) {
      const selectedDate = new Date(formData.dataReserva);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      // Preparar dados para o service
      const solicitacaoData = {
        tipo: "unica", // ou "semestral" baseado no formData
        data_inicio: formData.dataReserva,
        data_fim: formData.dataReserva,
        dias_semana: "Segunda", // Pode ser dinâmico baseado no formData
        turno: formData.turno,
        horario: formData.horario,
        observacoes: formData.infoAdicionais,
        espacoId: parseInt(espacoId),
        professorId: parseInt(professorId), // Deve vir do contexto de autenticação
      };

      await reservaService.fazerSolicitacao(solicitacaoData);
      setMessage({ type: "success", message: "Reserva solicitada com sucesso!" });
      setTimeout(() => {
        navigate("/professor/espacos");
      }, 1500);
    } catch (error) {
      setMessage({ type: "error", message: error.message || "Erro ao solicitar reserva" });
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (Object.values(formData).some((value) => value !== "")) {
      setShowModal(true);
    } else {
      navigate("/professor/espacos");
    }
  };

  const handleConfirmCancel = () => {
    setShowModal(false);
    navigate("/professor/espacos");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <Menu />
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="w-full max-w-6xl bg-gray-50 shadow-md p-6">
          <h1 className="text-2xl font-bold text-green-800 text-left mb-3">
            Solicitar reserva de espaço
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            Preencha os dados abaixo para solicitar a reserva.
          </p>

          {/* Mensagem global */}
          {message && <Message type={message.type} message={message.message} />}

          {/* Mensagem de carregando espaço */}
          {loadingEspaco && !message && (
            <Message type="loading" message="Carregando informações do espaço..." />
          )}

          {/* Mensagem de erro ao carregar espaço */}
          {errorEspaco && !message && (
            <Message type="error" message={errorEspaco} />
          )}

          {/* Informações do espaço */}
          {!loadingEspaco && !errorEspaco && espacoInfo && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600">
              <p className="font-medium text-green-800">
                Reservando: <span className="font-bold">{espacoInfo.nome}</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Bloco:</span> {espacoInfo.nomeBloco || 'Não informado'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Tipo:</span> {espacoInfo.nomeTipo}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Capacidade:</span> {espacoInfo.capacidade} pessoas
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Equipamentos:</span> {espacoInfo.equipamentos}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identificação do usuário: *
              </label>
              <input
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.usuario ? "border-red-500" : "border-gray-300"} bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600`}
                placeholder="Seu ID ou matrícula"
                required
              />
              {errors.usuario && <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Espaço: *
              </label>
              <input
                name="laboratorio"
                value={formData.laboratorio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Reserva: *
                </label>
                <input
                  name="dataReserva"
                  type="date"
                  value={formData.dataReserva}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border ${errors.dataReserva ? "border-red-500" : "border-gray-300"} bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600`}
                  required
                />
                {errors.dataReserva && <p className="mt-1 text-sm text-red-600">{errors.dataReserva}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Turno: *
                </label>
                <select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.turno ? "border-red-500" : "border-gray-300"} bg-gray-200 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600`}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
                {errors.turno && <p className="mt-1 text-sm text-red-600">{errors.turno}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário: *
                </label>
                <input
                  name="horario"
                  type="time"
                  value={formData.horario}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.horario ? "border-red-500" : "border-gray-300"} bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600`}
                  required
                />
                {errors.horario && <p className="mt-1 text-sm text-red-600">{errors.horario}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Informações adicionais:
              </label>
              <textarea
                name="infoAdicionais"
                value={formData.infoAdicionais}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                placeholder="Descreva o propósito da reserva (opcional)"
              />
            </div>

            <div className="w-full flex justify-between mt-10 gap-5">
              <button
                type="button"
                onClick={handleCancel}
                className="w-1/2 px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-bold"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-1/2 px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-bold disabled:opacity-50"
                disabled={isLoading || loadingEspaco || errorEspaco}
              >
                {isLoading ? "Enviando..." : "Confirmar Solicitação"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Cancelar solicitação?
            </h3>
            <p className="text-gray-700 mb-8">
              Deseja realmente cancelar a solicitação de reserva? Todas as
              informações não salvas serão perdidas.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors font-bold"
              >
                Não, continuar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-6 py-2 bg-red-600 text-white uppercase hover:bg-red-700 transition-colors font-bold"
              >
                Sim, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservarLaboratorio;