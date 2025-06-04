import { useState } from "react";

function TipoModal({ isOpen, onClose, onConfirm }) {
    const [nomeTipo, setNomeTipo] = useState("");
    const [tiposCadastrados, setTiposCadastrados] = useState([]);
  
    const handleCadastrar = () => {
      if (nomeBloco.trim()) {
        setTiposCadastrados([...tiposCadastrados, nomeTipo]);
        setNomeTipo("");
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 shadow-lg w-full max-w-3xl space-y-5">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Tipo de Espaço</h1>
          <div className="space-y-4">
            <div className="flex gap-5">
              <input 
                type="text" 
                value={nomeBloco}
                onChange={(e) => setNomeBloco(e.target.value)}
                placeholder="Nome do Bloco Didático"
                className="w-3/5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button 
                onClick={handleCadastrar}
                className="w-2/5 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium uppercase"
                >
                Cadastrar Tipo de Espaço
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Tipos de Espaços Cadastrados</h3>
              {tiposCadastrados.map((tipo, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 border">
                  <span>{tipo}</span>
                  <button 
                    onClick={() => setTiposCadastrados(tiposCadastrados.filter((_, i) => i !== index))}
                    className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
            
            <div className="w-full flex justify-between gap-3 pt-4">
              <button 
                onClick={onClose}
                className="w-2/4 px-4 py-2 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white transition-colors font-medium uppercase"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  onConfirm(tiposCadastrados);
                  onClose();
                }}
                className="w-2/4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium uppercase"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default TipoModal;