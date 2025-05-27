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
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <div className="flex flex-col mb-6 gap-4">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Histórico de Reservas de Espaços
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center mb-8">
            <div className="w-full sm:w-2/5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar reserva"
                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
              />
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0 font-medium">
              <button className="w-full sm:w-auto px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors">
                Filtrar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-lg text-center">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-center">ID</th>
                  <th className="px-4 py-3 text-center">Professor</th>
                  <th className="px-4 py-3 text-center">Espaço</th>
                  <th className="px-4 py-3 text-center">Tipo</th>
                  <th className="px-4 py-3 text-center">Data da reserva</th>
                  <th className="px-4 py-3 text-center">Turno</th>
                  <th className="px-4 py-3 text-center">Horário</th>
                  <th className="px-4 py-3 text-center">RR</th>
                </tr>
              </thead>
              <tbody>
                {reservasAceitas.length > 0 ? (
                  reservasAceitas.map((reserva, index) => (
                    <tr
                      key={reserva.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    >
                      <td className="px-4 py-3 text-center">{reserva.id.toString().padStart(2, "0")}</td>
                      <td className="px-4 py-3 text-center">{reserva.usuario.nome}</td>
                      <td className="px-4 py-3 text-center">{reserva.laboratorio.nome}</td>
                      <td className="px-4 py-3 text-center">{reserva.tipo}</td>
                      <td className="px-4 py-3 text-center">{reserva.data}</td>
                      <td className="px-4 py-3 text-center">{reserva.turno}</td>
                      <td className="px-4 py-3 text-center">{reserva.horario}</td>
                      <td className="px-4 py-3 text-center">{reserva.recorrente}</td>
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