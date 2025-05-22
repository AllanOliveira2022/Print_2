import MenuProfessor from "../../../components/professor/menu/menu";
import { FaSearch } from "react-icons/fa";

function SolicitacoesProfessor() {
    const solicitacoes = [
        {
            id: 1,
            laboratorio: "Lab de Informática",
            data: "2025-05-25",
            horarioInicio: "08:00",
            horarioFim: "10:00",
            status: "Pendente",
        },
        {
            id: 2,
            laboratorio: "Lab de Física",
            data: "2025-05-28",
            horarioInicio: "13:00",
            horarioFim: "15:00",
            status: "Aceita",
        },
        {
            id: 3,
            laboratorio: "Lab de Química",
            data: "2025-06-01",
            horarioInicio: "10:00",
            horarioFim: "12:00",
            status: "Recusada",
        },
    ];

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

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-6">
                        <div className="w-full sm:w-2/5 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Pesquisar solicitação"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                            />
                        </div>
                        <button className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors font-bold">
                            Filtrar
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-4 py-3">Código</th>
                                    <th className="px-4 py-3">Laboratório</th>
                                    <th className="px-4 py-3">Data</th>
                                    <th className="px-4 py-3">Horário</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solicitacoes.map((s, index) => (
                                    <tr
                                        key={s.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                                    >
                                        <td className="px-4 py-3">{s.id}</td>
                                        <td className="px-4 py-3">{s.laboratorio}</td>
                                        <td className="px-4 py-3">{s.data}</td>
                                        <td className="px-4 py-3">
                                            {s.horarioInicio} - {s.horarioFim}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusStyle(
                                                    s.status
                                                )}`}
                                            >
                                                {s.status}
                                            </span>
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

export default SolicitacoesProfessor;
