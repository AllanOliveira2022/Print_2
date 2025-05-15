import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../pages/professor/menuProfessor/menuProfessor";

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
      // Exemplo de requisição POST para reservar laboratório
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Reserva solicitada com sucesso!");
        navigate("/professor/minhasReservas"); // ou a página que listar reservas
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
    navigate("/professor/laboratorios"); // volta para a lista de laboratórios
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col w-full p-8 items-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold text-black mb-2">Solicitar reserva de laboratório</h2>
          <p className="text-gray-500 mb-6">Preencha os dados abaixo para solicitar a reserva.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-black">Identificação do usuário:</label>
              <input
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-black">Laboratório:</label>
              <input
                name="laboratorio"
                value={formData.laboratorio}
                onChange={handleChange}
                className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-black">Data da Reserva:</label>
                <input
                  name="dataReserva"
                  type="date"
                  value={formData.dataReserva}
                  onChange={handleChange}
                  className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black">Turno:</label>
                <input
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                  placeholder="Manhã, Tarde ou Noite"
                  className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-black">Horário:</label>
                <input
                  name="horario"
                  type="time"
                  value={formData.horario}
                  onChange={handleChange}
                  className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-black">Informações adicionais:</label>
              <textarea
                name="infoAdicionais"
                value={formData.infoAdicionais}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 text-sm border border-gray-300 rounded-md bg-gray-200 resize-none"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-green-600 text-green-600 px-10 py-3 rounded hover:bg-red-700 hover:text-white hover:border-red-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-10 py-3 rounded hover:bg-green-800"
              >
                Solicitar Reserva
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-100">
          <div className="bg-white p-8 rounded shadow-lg w-85">
            <h3 className="text-xl font-semibold text-black mb-4">Cancelar solicitação?</h3>
            <p className="text-sm font-semibold text-gray-700 mb-10">
              Deseja realmente cancelar a solicitação de reserva? Todas as informações não salvas serão perdidas.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-white-600 text-green-700 border border-green-600 px-10 py-3 rounded hover:bg-green-700 hover:text-white"
              >
                Não, continuar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-10 py-3 rounded hover:bg-red-700"
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
