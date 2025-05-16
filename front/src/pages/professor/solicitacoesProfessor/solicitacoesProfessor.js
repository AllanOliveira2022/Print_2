import MenuProfessor from "../menuProfessor/menuProfessor";

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
                return "bg-green-100 text-green-700";
            case "Pendente":
                return "bg-gray-100 text-gray-700";
            case "Recusada":
                return "bg-red-100 text-red-700";
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
