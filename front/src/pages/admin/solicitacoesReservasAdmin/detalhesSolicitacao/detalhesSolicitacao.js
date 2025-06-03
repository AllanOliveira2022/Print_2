import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../../../../components/tecLab/menu/menu";

function DetalhesSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [justificativa, setJustificativa] = useState("");

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
      situacao: "Rejeitada",
      descricao: "Solicitação para manutenção.",
    },
  ];

  const sol = solicitacoes.find((s) => s.id === Number(id));

  const aceitarSolicitacao = () => {
    alert(`Solicitação #${sol.id} aceita!`);
    navigate("/admin/solicitacoes");
  };

  const handleConfirmCancel = () => {
    if (!justificativa.trim()) {
      alert("Por favor, insira uma justificativa para a negação.");
      return;
    }
    alert(`Solicitação #${sol.id} negada!\nJustificativa: ${justificativa}`);
    setShowModal(false);
    navigate("/admin/solicitacoes");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setJustificativa(""); // limpa ao fechar
  };

  if (!sol) {
    return (
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <Menu />
        <div className="flex justify-center w-full p-4 md:p-8">
          <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-xl font-bold text-red-600">Solicitação não encontrada!</h2>
            <button
              onClick={() => navigate("/admin/solicitacoes")}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-4xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">Detalhes da Solicitação</h1>

          <div className="space-y-4">
            <p><strong>Professor:</strong> {sol.nomeProfessor}</p>
            <p><strong>Espaços:</strong> {sol.laboratorio}</p>
            <p><strong>Data e Hora:</strong> {sol.dataHora}</p>
            <p><strong>Situação:</strong> {sol.situacao}</p>
            <p><strong>Descrição:</strong> {sol.descricao}</p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Negar solicitação de reserva
            </button>
            <button
              onClick={aceitarSolicitacao}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Aceitar solicitação de reserva
            </button>
            <button
              onClick={() => navigate("/admin/solicitacoes")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold text-black mb-4">Negar solicitação de reserva?</h3>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              Deseja realmente cancelar a solicitação de reserva? Todas as informações não salvas serão perdidas.
            </p>
            <textarea
              placeholder="Digite a justificativa da negação..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              className="w-full h-24 border border-gray-300 rounded p-2 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            ></textarea>
            <div className="flex justify-between">
            <div className="flex gap-4">
                    <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                            Voltar
                    </button>
                    <button
                        onClick={handleConfirmCancel}
                        className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700">
                            Enviar justificativa ao professor
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalhesSolicitacao;
