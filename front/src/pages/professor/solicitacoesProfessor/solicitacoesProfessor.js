import { useState, useEffect } from "react";
import MenuProfessor from "../../../components/professor/menu/menu";
import { FaSearch } from "react-icons/fa";
import reservaService from "../../../services/reservaService";

function SolicitacoesProfessor() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Recupera o usuário logado do localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const professorId = user?.id;

    useEffect(() => {
        if (professorId) {
            carregarSolicitacoes();
        }
    }, [professorId]);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            carregarSolicitacoes();
        } else {
            filtrarSolicitacoes();
        }
    }, [searchTerm]);

    const carregarSolicitacoes = async () => {
        try {
            setLoading(true);
            setError(null);
            const dados = await reservaService.getReservasProfessor(professorId);
            setSolicitacoes(dados);
        } catch (err) {
            console.error("Erro ao carregar solicitações:", err);
            setError("Erro ao carregar solicitações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const filtrarSolicitacoes = async () => {
        try {
            setLoading(true);
            setError(null);
            const dados = await reservaService.getReservasProfessor(professorId);
            
            // Filtro local por termo de busca
            const dadosFiltrados = dados.filter(solicitacao =>
                solicitacao.espaco?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                solicitacao.espaco?.codigoIdentificacao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                solicitacao.data_inicio?.includes(searchTerm)
            );
            
            setSolicitacoes(dadosFiltrados);
        } catch (err) {
            console.error("Erro ao filtrar solicitações:", err);
            setError("Erro ao filtrar solicitações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Aceita":
                return "bg-green-500 text-green-900";
            case "Pendente":
                return "bg-yellow-500 text-yellow-900";
            case "Recusada":
                return "bg-red-500 text-red-900";
            default:
                return "";
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <MenuProfessor />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
                        Minhas Solicitações de Reserva
                    </h1>

                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-6">
                        <div className="w-full sm:w-2/5 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Pesquisar solicitação"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                            />
                        </div>
                        <button 
                            onClick={() => setSearchTerm("")}
                            className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors font-bold"
                        >
                            Limpar
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">Carregando solicitações...</p>
                        </div>
                    ) : solicitacoes.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">
                                {searchTerm
                                    ? "Nenhuma solicitação encontrada para sua pesquisa."
                                    : "Nenhuma solicitação encontrada."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3">Código</th>
                                        <th className="px-4 py-3">Espaço</th>
                                        <th className="px-4 py-3">Data</th>
                                        <th className="px-4 py-3">Horário</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitacoes.map((solicitacao, index) => (
                                        <tr
                                            key={solicitacao.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="px-4 py-3">{solicitacao.id}</td>
                                            <td className="px-4 py-3">{solicitacao.espaco?.nome || 'N/A'}</td>
                                            <td className="px-4 py-3">{solicitacao.data_inicio}</td>
                                            <td className="px-4 py-3">{solicitacao.horario}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusStyle(
                                                        solicitacao.status
                                                    )}`}
                                                >
                                                    {solicitacao.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SolicitacoesProfessor;
