function AceitarReservaModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-2">
          Aceitar solicitação de reserva de espaço?
        </h2>
        <p className="mb-6 text-gray-700">
          Deseja realmente aceitar esta solicitação de reserva de espaço?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 border-2 border-red-600 text-red-600 font-bold uppercase py-2 rounded hover:bg-red-50 transition-colors"
            onClick={onClose}
            type="button"
          >
            Voltar
          </button>
          <button
            className="flex-1 bg-green-600 text-white font-bold uppercase py-2 rounded hover:bg-green-700 transition-colors"
            onClick={onConfirm}
            type="button"
          >
            Aceitar Solicitação
          </button>
        </div>
      </div>
    </div>
  );
}

export default AceitarReservaModal;
