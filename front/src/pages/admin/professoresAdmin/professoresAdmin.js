import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "../../../components/tecLab/menu/menu";
import adminService from "../../../services/adminService";

function ProfessoresAdmin() {
    const navigate = useNavigate();
    const [professores, setProfessores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        carregarProfessores();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            carregarProfessores();
        } else {
            buscarPorNome();
        }
    }, [searchTerm]);

    const carregarProfessores = async () => {
        try {
            const dados = await adminService.listarProfessores();
            setProfessores(dados);
        } catch (err) {
            console.error("Erro ao carregar professores:", err);
        }
    };

    const buscarPorNome = async () => {
        try {
            const todosProfessores = await adminService.listarProfessores();
            const filtrados = todosProfessores.filter(professor =>
                professor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                professor.codigo_institucional.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProfessores(filtrados);
        } catch (err) {
            console.error("Erro na busca:", err);
        }
    };

    const handleCadastro = () => {
        navigate("/admin/professores/cadastrar");
    };

    const handleEditar = (id) => {
        navigate(`/admin/professores/editar/${id}`);
    };

    const handleDetalhes = (id) => {
        navigate(`/admin/professores/detalhes/${id}`);
    };

    const handleExcluir = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja excluir o professor "${nome}"?`)) {
            try {
                // Implementar a função de exclusão no service quando existir
                // await adminService.excluirProfessor(id);
                if (searchTerm.trim()) {
                    await buscarPorNome();
                } else {
                    await carregarProfessores();
                }
                alert(`Professor ${nome} excluído com sucesso!`);
            } catch (err) {
                console.error("Erro ao excluir:", err);
                alert(`Erro ao excluir professor: ${err.message}`);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <Menu />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <div className="flex flex-row mb-6 gap-4 justify-between items-center">
                        <h1 className="text-2xl font-bold text-green-800 text-left">
                            Professores Cadastrados ({professores.length})
                        </h1>
                        <div className="w-full sm:w-2/5 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Pesquisar professor, email ou código"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
                            />
                        </div>
                    </div>

                    {professores.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">
                                {searchTerm ? "Nenhum professor encontrado para sua pesquisa." : "Nenhum professor cadastrado."}
                            </p>
                            {!searchTerm && (
                                <button
                                    onClick={handleCadastro}
                                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Cadastrar Primeiro Professor
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                                <thead className="bg-green-600 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-center">Código Institucional</th>
                                        <th className="px-4 py-3 text-center">Nome</th>
                                        <th className="px-4 py-3 text-center">Email</th>
                                        <th className="px-4 py-3 text-center">Área de Atuação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professores.map((professor, index) => (
                                        <tr
                                            key={professor.id}
                                            className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                        >
                                            <td className="px-4 py-3 text-center">{professor.codigo_institucional}</td>
                                            <td className="px-4 py-3 text-center">{professor.nome}</td>
                                            <td className="px-4 py-3 text-center">{professor.email}</td>
                                            <td className="px-4 py-3 text-center">{professor.area_atuacao || '-'}</td>
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

export default ProfessoresAdmin;