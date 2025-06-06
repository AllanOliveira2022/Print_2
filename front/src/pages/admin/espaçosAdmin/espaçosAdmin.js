import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "../../../components/tecLab/menu/menu";
import espacoService from "../../../services/espacoService";

function EspacosAdmin() {
    const navigate = useNavigate();
    const [espacos, setEspacos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEspacos, setFilteredEspacos] = useState([]);

    // Carregar espaços ao montar o componente
    useEffect(() => {
        carregarEspacos();
    }, []);

    // Filtrar espaços com base na pesquisa
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredEspacos(espacos);
        } else {
            const filtered = espacos.filter(espaco =>
                espaco.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (espaco.nomeBloco && espaco.nomeBloco.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (espaco.nomeTipo && espaco.nomeTipo.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredEspacos(filtered);
        }
    }, [searchTerm, espacos]);

    const carregarEspacos = async () => {
        try {
            setLoading(true);
            setError(null);
            const dados = await espacoService.listarTodos();
            setEspacos(dados);
            setFilteredEspacos(dados);
        } catch (err) {
            setError(err.message || "Erro ao carregar espaços. Tente novamente.");
            console.error("Erro ao carregar espaços:", err);
        } finally {
            setLoading(false);
        }
    };

    const buscarPorNome = async () => {
        try {
            setLoading(true);
            setError(null);
            const dados = await espacoService.buscarPorNome(searchTerm);
            setEspacos(dados);
            setFilteredEspacos(dados);
        } catch (err) {
            setError(err.message || "Erro na busca. Tente novamente.");
            console.error("Erro na busca:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCadastro = () => {
        navigate("/admin/espacos/cadastrar");
    };

    const handleEditar = (id) => {
        navigate(`/admin/espacos/editar/${id}`);
    };

    const handleDetalhes = (id) => {
        navigate(`/admin/espacos/detalhes/${id}`);
    };

    const handleExcluir = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja excluir o espaço "${nome}"?`)) {
            try {
                setLoading(true);
                await espacoService.excluir(id);
                await carregarEspacos();
            } catch (err) {
                setError(err.message || "Erro ao excluir espaço. Tente novamente.");
                console.error("Erro ao excluir:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFiltrar = async () => {
        if (searchTerm.trim()) {
            await buscarPorNome();
        } else {
            await carregarEspacos();
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleFiltrar();
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                <Menu />
                <div className="flex justify-center items-center w-full p-4 md:p-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Carregando espaços...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                <Menu />
                <div className="flex justify-center items-center w-full p-4 md:p-8">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={carregarEspacos}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Tentar Novamente
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
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <div className="flex flex-col mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-green-800 text-left">
                            Espaços Cadastrados ({filteredEspacos.length})
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-8">
                        <div className="w-full sm:w-2/5 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Pesquisar espaço, bloco ou tipo"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
                            />
                        </div>

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0 font-medium">
                            <button 
                                onClick={handleFiltrar}
                                className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors"
                            >
                                Buscar
                            </button>
                            <button
                                onClick={handleCadastro}
                                className="w-full sm:w-auto px-6 py-2 bg-green-600 border-2 border-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors uppercase"
                            >
                                Cadastrar Espaço
                            </button>
                        </div>
                    </div>

                    {filteredEspacos.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">
                                {searchTerm ? "Nenhum espaço encontrado para sua pesquisa." : "Nenhum espaço cadastrado."}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={handleCadastro}
                                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Cadastrar Primeiro Espaço
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-center">Código</th>
                                        <th className="px-4 py-3 text-center">Nome</th>
                                        <th className="px-4 py-3 text-center">Bloco</th>
                                        <th className="px-4 py-3 text-center">Tipo</th>
                                        <th className="px-4 py-3 text-center">Situação</th>
                                        <th className="px-4 py-3 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEspacos.map((espaco, index) => (
                                        <tr
                                            key={espaco.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="px-4 py-3 text-center">{espaco.codigoIdentificacao}</td>
                                            <td className="px-4 py-3 text-center">{espaco.nome}</td>
                                            <td className="px-4 py-3 text-center">{espaco.nomeBloco || '-'}</td>
                                            <td className="px-4 py-3 text-center">{espaco.nomeTipo || '-'}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-1 rounded text-sm ${
                                                    espaco.situacao === 'Disponivel' || espaco.situacao === 'Disponível'
                                                        ? 'bg-green-100 text-green-800'
                                                        : espaco.situacao === 'Indisponivel' || espaco.situacao === 'Indisponível'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {espaco.situacao}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex justify-center gap-2 flex-wrap">
                                                    <button 
                                                        onClick={() => handleDetalhes(espaco.id)}
                                                        className="px-4 py-1 bg-gray-500 text-white hover:bg-gray-600 transition-colors font-medium"
                                                    >
                                                        Detalhes
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditar(espaco.id)}
                                                        className="px-4 py-1 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button 
                                                        onClick={() => handleExcluir(espaco.id, espaco.nome)}
                                                        className="px-4 py-1 bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
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

export default EspacosAdmin;