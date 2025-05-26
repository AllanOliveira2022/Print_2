import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/professor/menu/menu";

function ReservarLaboratorio() {
  const [formData, setFormData] = useState({
    usuario: "",
    laboratorio: "",
    dataReserva: "",
    turno: "",
    horario: "",
    infoAdicionais: "",
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Reserva solicitada com sucesso!");
        navigate("/professor/minhasReservas");
      } else {
        alert("Erro ao solicitar reserva.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
  };

  const handleCancel = () => {
    setShowModal(true);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Identificação do usuário:
              </label>
              <input
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Espaço:
              </label>
              <input
                name="laboratorio"
                value={formData.laboratorio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data da Reserva:
                </label>
                <input
                  name="dataReserva"
                  type="date"
                  value={formData.dataReserva}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Turno:
                </label>
                <input
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                  placeholder="Manhã, Tarde ou Noite"
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário:
                </label>
                <input
                  name="horario"
                  type="time"
                  value={formData.horario}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
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
              />
            </div>

            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-bold"
              >
                Solicitar Reserva
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