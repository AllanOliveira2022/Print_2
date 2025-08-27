import { useState } from "react";

function NegarReservaModal({ isOpen, onClose, onConfirm }) {
  const [justificativa, setJustificativa] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-2">
          Negar solicitação de reserva de laboratório?
        </h2>
        <p className="mb-4 text-gray-700">
          Tem certeza de que deseja negar esta solicitação de reserva de laboratório? Por favor, insira uma justificativa para a negação. Essa justificativa será enviada ao professor responsável pela solicitação.
        </p>
        <textarea
          className="w-full min-h-[100px] border border-gray-300 rounded p-3 mb-6 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Digite a justificativa..."
          value={justificativa}
          onChange={e => setJustificativa(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 border-2 border-red-600 text-red-600 font-bold uppercase py-2 rounded hover:bg-red-50 transition-colors"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-green-600 text-white font-bold uppercase py-2 rounded hover:bg-green-700 transition-colors"
            onClick={() => onConfirm(justificativa)}
            type="button"
            disabled={!justificativa.trim()}
          >
            Enviar Justificativa
          </button>
        </div>
      </div>
    </div>
  );
}

export default NegarReservaModal;
