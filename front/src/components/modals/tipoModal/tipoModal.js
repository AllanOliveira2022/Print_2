import { useState, useEffect } from "react";
import tipoService from "../../../services/tipoService";

function TipoModal({ isOpen, onClose, onConfirm }) {
    const [nomeTipo, setNomeTipo] = useState("");
    const [tiposCadastrados, setTiposCadastrados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carrega os tipos cadastrados ao abrir o modal
    useEffect(() => {
        if (isOpen) {
            carregarTipos();
        }
    }, [isOpen]);

    const carregarTipos = async () => {
        setLoading(true);
        setError(null);
        try {
            const tipos = await tipoService.listarTodos();
            setTiposCadastrados(tipos);
        } catch (err) {
            setError(err.message);
            console.error("Erro ao carregar tipos:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCadastrar = async () => {
        if (nomeTipo.trim()) {
            setLoading(true);
            setError(null);
            try {
                await tipoService.cadastrar({ nome: nomeTipo });
                await carregarTipos(); // Recarrega a lista após cadastrar
                setNomeTipo("");
            } catch (err) {
                setError(err.message);
                console.error("Erro ao cadastrar tipo:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleExcluir = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await tipoService.excluir(id);
            await carregarTipos(); // Recarrega a lista após excluir
        } catch (err) {
            setError(err.message);
            console.error("Erro ao excluir tipo:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 shadow-lg w-full max-w-3xl space-y-5">
                <h1 className="text-xl font-semibold text-gray-800 mb-4">Cadastrar Tipo de Espaço</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                {loading && (
                    <div className="text-center py-4">
                        <span className="text-gray-600">Carregando...</span>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex gap-5">
                        <input 
                            type="text" 
                            value={nomeTipo}
                            onChange={(e) => setNomeTipo(e.target.value)}
                            placeholder="Nome do Tipo de Espaço"
                            className="w-3/5 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                            disabled={loading}
                        />
                        <button 
                            onClick={handleCadastrar}
                            disabled={!nomeTipo.trim() || loading}
                            className={`w-2/5 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium uppercase ${
                                (!nomeTipo.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Cadastrar Tipo de Espaço
                        </button>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Tipos de Espaços Cadastrados</h3>
                        {tiposCadastrados.length === 0 ? (
                            <p className="text-gray-500">Nenhum tipo cadastrado</p>
                        ) : (
                            tiposCadastrados.map((tipo) => (
                                <div key={tipo.id} className="flex items-center justify-between bg-gray-50 p-3 border">
                                    <span>{tipo.nome}</span>
                                    <button 
                                        onClick={() => handleExcluir(tipo.id)}
                                        disabled={loading}
                                        className={`px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm ${
                                            loading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    
                    <div className="w-full flex justify-between gap-3 pt-4">
                        <button 
                            onClick={() => {
                                onConfirm(tiposCadastrados);
                                onClose();
                            }}
                            disabled={loading}
                            className={`w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium uppercase ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
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