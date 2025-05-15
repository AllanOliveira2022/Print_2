import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MenuProfessor from "../menuProfessor/menuProfessor";

function LaboratoriosProfessor() {
    const navigate = useNavigate();

    const laboratorios = [
        { id: 1, nome: "Lab de Informática", localizacao: "Bloco A", tipo: "Tecnologia", situacao: "Disponivel" },
        { id: 2, nome: "Lab de Química", localizacao: "Bloco B", tipo: "Ciências", situacao: "Indisponivel" },
        { id: 3, nome: "Lab de Física", localizacao: "Bloco C", tipo: "Exatas", situacao: "Disponivel" },
        { id: 4, nome: "Lab de Mecatrônica", localizacao: "Bloco A", tipo: "Mecatrônica", situacao: "Disponivel" }
    ];

    const handleReservar = () => {
        navigate("/professor/solicitarReserva");
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <MenuProfessor />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
                        Laboratórios Cadastrados
                    </h1>

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
                        <button className="w-full sm:w-auto px-6 py-3 text-green-600 border-2 border-green-600 uppercase hover:bg-green-700 hover:text-white hover:border-green-700 rounded-lg transition-colors font-bold">
                            Filtrar
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-4 py-3">Código</th>
                                    <th className="px-4 py-3">Nome</th>
                                    <th className="px-4 py-3">Localização</th>
                                    <th className="px-4 py-3">Tipo</th>
                                    <th className="px-4 py-3">Situação</th>
                                    <th className="px-4 py-3">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laboratorios.map((lab, index) => (
                                    <tr
                                        key={lab.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                    >
                                        <td className="px-4 py-3">{lab.id}</td>
                                        <td className="px-4 py-3">{lab.nome}</td>
                                        <td className="px-4 py-3">{lab.localizacao}</td>
                                        <td className="px-4 py-3">{lab.tipo}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full font-semibold text-sm ${
                                                    lab.situacao === "Disponivel"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {lab.situacao}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={handleReservar}
                                                disabled={lab.situacao !== "Disponivel"}
                                                className={`px-5 py-2 rounded-md transition font-medium ${
                                                    lab.situacao === "Disponivel"
                                                        ? "bg-green-600 text-white hover:bg-green-700"
                                                        : "bg-gray-400 text-white cursor-not-allowed"
                                                }`}
                                            >
                                                Solicitar Reserva
                                            </button>
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

export default LaboratoriosProfessor;
