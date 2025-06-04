import { useState } from "react";

function BlocoModal({ isOpen, onClose, onConfirm }) {
  const [nomeBloco, setNomeBloco] = useState("");
  const [blocosCadastrados, setBlocosCadastrados] = useState([]);

  const handleCadastrar = () => {
    if (nomeBloco.trim()) {
      setBlocosCadastrados([...blocosCadastrados, nomeBloco]);
      setNomeBloco("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 shadow-lg w-full max-w-3xl space-y-5 rounded-lg">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Cadastrar Bloco Didático</h1>
        <p className="text-gray-600 mb-4">Adicione novos blocos didáticos ao sistema</p>
        
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Bloco Didático</label>
              <input 
                type="text" 
                value={nomeBloco}
                onChange={(e) => setNomeBloco(e.target.value)}
                placeholder="Digite o nome do bloco"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button 
              onClick={handleCadastrar}
              className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium uppercase tracking-wider disabled:opacity-50"
              disabled={!nomeBloco.trim()}
            >
              Cadastrar
            </button>
          </div>

          {blocosCadastrados.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Blocos Didáticos Cadastrados ({blocosCadastrados.length})
              </h3>
              <div className="max-h-60 overflow-y-auto">
                {blocosCadastrados.map((bloco, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 border rounded hover:bg-gray-50">
                    <span className="text-gray-800">{bloco}</span>
                    <button 
                      onClick={() => setBlocosCadastrados(blocosCadastrados.filter((_, i) => i !== index))}
                      className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm rounded"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between gap-4 pt-6 border-t">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-2 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors font-semibold uppercase tracking-wider rounded"
            >
              Cancelar
            </button>
            <button 
              onClick={() => {
                onConfirm(blocosCadastrados);
                onClose();
              }}
              className="flex-1 px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-semibold uppercase tracking-wider rounded disabled:opacity-50"
              disabled={blocosCadastrados.length === 0}
            >
              Concluir Cadastro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocoModal;