import { useState, useEffect } from "react";
import espacoService from "../../../services/espacoService";

function RedirecionarReservaModal({ isOpen, onClose, onConfirm }) {
  const [espacoId, setEspacoId] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [espacos, setEspacos] = useState([]);

  useEffect(() => {
    if (isOpen) {
      espacoService.listarTodos()
        .then(data => {
          setEspacos(data);
          console.log("Espaços carregados:", data);
        })
        .catch(err => {
          setEspacos([]);
          console.error("Erro ao carregar espaços:", err);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg max-w-lg w-full p-6">
        <h2 className="text-xl font-bold mb-2">
          Aceitar e redirecionar espaço?
        </h2>
        <p className="mb-4 text-gray-700">
          Nesta opção, você aceita a solicitação de reserva do professor, mas irá redirecioná-lo à outro espaço. Selecione um espaço disponível e insira uma justificativa da mudança de espaço.
        </p>
        <select
          className="w-full mb-4 border border-gray-300 rounded p-3 bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={espacoId}
          onChange={e => setEspacoId(e.target.value)}
        >
          <option value="">Selecione um espaço disponível</option>
          {espacos.map(espaco => (
            <option key={espaco.id} value={espaco.id}>
              {/* Exibe nome e código, com fallback */}
              {(espaco.nome || espaco.nomeBloco || "Espaço sem nome")}
              {espaco.codigoIdentificacao ? ` (${espaco.codigoIdentificacao})` : ""}
            </option>
          ))}
        </select>
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
            onClick={() => onConfirm({ espacoId, justificativa })}
            type="button"
            disabled={!espacoId || !justificativa.trim()}
          >
            Enviar Justificativa
          </button>
        </div>
      </div>
    </div>
  );
}

export default RedirecionarReservaModal;
