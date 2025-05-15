import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function MenuLabs() {
    const navigate = useNavigate();

    const handleCadastro = () => {
        navigate("/admin/laboratorios/cadastrar");
    };

    const laboratorios = [
        { id: 1, nome: "Lab de Informática", localizacao: "Bloco A", tipo: "Tecnologia", situacao: "Disponivel" },
        { id: 2, nome: "Lab de Química", localizacao: "Bloco B", tipo: "Ciências", situacao: "Indisponivel" },
        { id: 3, nome: "Lab de Física", localizacao: "Bloco C", tipo: "Exatas", situacao: "Disponivel" },
        { id: 4, nome: "Lab de Mecatronica", localizacao: "Bloco A", tipo: "Mecatronica", situacao: "Disponivel" }
    ];

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <Menu />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <div className="flex flex-col mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-700 text-center">
                            Laboratórios Cadastrados
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-6">
                        <div className="w-full sm:w-1/2 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Pesquisar laboratório"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 rounded-lg"
                            />
                        </div>

                        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0">
                            <button className="w-full sm:w-auto px-6 py-3 text-green-600 border-2 border-green-600 uppercase hover:bg-green-700 hover:text-white hover:border-green-700 rounded-lg transition-colors">
                                Filtrar
                            </button>
                            <button
                                onClick={handleCadastro}
                                className="w-full sm:w-auto px-6 py-3 bg-green-600 border-2 border-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors uppercase rounded-lg">
                                Cadastrar Laboratório
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-center">Código</th>
                                    <th className="px-4 py-3 text-center">Nome</th>
                                    <th className="px-4 py-3 text-center">Localização</th>
                                    <th className="px-4 py-3 text-center">Tipo</th>
                                    <th className="px-4 py-3 text-center">Situação</th>
                                    <th className="px-4 py-3 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laboratorios.map((lab, index) => (
                                    <tr
                                        key={lab.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                    >
                                        <td className="px-4 py-3 text-center">{lab.id}</td>
                                        <td className="px-4 py-3 text-center">{lab.nome}</td>
                                        <td className="px-4 py-3 text-center">{lab.localizacao}</td>
                                        <td className="px-4 py-3 text-center">{lab.tipo}</td>
                                        <td className="px-4 py-3 text-center">{lab.situacao}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2 flex-wrap">
                                                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                                                    Detalhes
                                                </button>
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                                    Editar
                                                </button>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuLabs;
