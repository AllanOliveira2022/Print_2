import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuProfessor from "../../../components/professor/menu/menu";
import espacoService from "../../../services/espacoService";

function EspacosProfessor() {
  const navigate = useNavigate();
  const [espacos, setEspacos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    carregarEspacos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      carregarEspacos();
    } else {
      buscarPorNome();
    }
  }, [searchTerm]);

  const carregarEspacos = async () => {
    try {
      const dados = await espacoService.listarTodos();
      setEspacos(dados);
    } catch (err) {
      console.error("Erro ao carregar espaços:", err);
    }
  };

  const buscarPorNome = async () => {
    try {
      const dados = await espacoService.buscarPorNome(searchTerm);
      setEspacos(dados);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  const handleDetalhes = (id) => {
    navigate(`/professor/espacos/detalhes/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <MenuProfessor />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <div className="flex flex-row mb-6 gap-4 justify-between items-center">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Espaços Cadastrados ({espacos.length})
            </h1>
            <div className="w-full sm:w-2/5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar espaço, bloco ou tipo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:text-green-600 focus:ring-green-600 focus:border-none"
              />
            </div>
          </div>

          {espacos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">
                {searchTerm
                  ? "Nenhum espaço encontrado para sua pesquisa."
                  : "Nenhum espaço cadastrado."}
              </p>
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
                  {espacos.map((espaco, index) => (
                    <tr
                      key={espaco.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                    >
                      <td className="px-4 py-3 text-center">
                        {espaco.codigoIdentificacao}
                      </td>
                      <td className="px-4 py-3 text-center">{espaco.nome}</td>
                      <td className="px-4 py-3 text-center">
                        {espaco.nomeBloco || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {espaco.nomeTipo || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            espaco.situacao === "Disponivel" ||
                            espaco.situacao === "Disponível"
                              ? "bg-green-100 text-green-800"
                              : espaco.situacao === "Indisponivel" ||
                                espaco.situacao === "Indisponível"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {espaco.situacao}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDetalhes(espaco.id)}
                          className="px-4 py-1 bg-gray-500 text-white hover:bg-gray-600 transition-colors font-medium"
                        >
                          Detalhes
                        </button>
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

export default EspacosProfessor;