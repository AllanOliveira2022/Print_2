import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Menu from "../../../components/tecLab/menu/menu";

function ReservasAceitas() {
  const [reservasAceitas, setReservasAceitas] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        laboratorio: { nome: "LAB01" },
        usuario: { nome: "PEDRO RAMON" },
        tipo: "INFORMÁTICA",
        data: "25/05/2025",
        turno: "VESPERTINO",
        horario: "13:00 - 15:00",
        recorrente: "SIM",
      },
      {
        id: 2,
        laboratorio: { nome: "LAB02" },
        usuario: { nome: "LUCAS CARDOSO" },
        tipo: "MECANICA",
        data: "15/06/2025",
        turno: "NOTURNO",
        horario: "18:20 - 20:00",
        recorrente: "NÃO",
      },
      {
        id: 3,
        laboratorio: { nome: "LAB01" },
        usuario: { nome: "AMANDA SILVA" },
        tipo: "INFORMÁTICA",
        data: "25/05/2025",
        turno: "VESPERTINO",
        horario: "15:20 - 17:00",
        recorrente: "SIM",
      },
    ];

    setReservasAceitas(mockData);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col w-full p-6 md:p-10">
        <div className="w-full bg-white rounded shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de reservas de laboratório</h2>

          {/* Área de busca e filtro */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Pesquisar reserva de laboratório..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md text-sm">
              FILTRAR
            </button>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-center">ID</th>
                  <th className="px-4 py-2 text-center">Professor</th>
                  <th className="px-4 py-2 text-center">Laboratório</th>
                  <th className="px-4 py-2 text-center">Tipo</th>
                  <th className="px-4 py-2 text-center">Data da reserva</th>
                  <th className="px-4 py-2 text-center">Turno</th>
                  <th className="px-4 py-2 text-center">Horário</th>
                  <th className="px-4 py-2 text-center">RR</th>
                </tr>
              </thead>
              <tbody>
                {reservasAceitas.length > 0 ? (
                  reservasAceitas.map((reserva, index) => (
                    <tr key={reserva.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                      <td className="py-2 text-center">{reserva.id.toString().padStart(2, "0")}</td>
                      <td className="text-center py-2">{reserva.usuario.nome}</td>
                      <td className="py-2  text-center">{reserva.laboratorio.nome}</td>
                      <td className="py-2 text-center">{reserva.tipo}</td>
                      <td className="py-2 text-center">{reserva.data}</td>
                      <td className="py-2 text-center">{reserva.turno}</td>
                      <td className="py-2 text-center">{reserva.horario}</td>
                      <td className="py-2 text-center">{reserva.recorrente}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                      Nenhuma reserva encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservasAceitas;
