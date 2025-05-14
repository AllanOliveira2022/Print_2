import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function CadastrarLaboratorio() {
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    bloco: "",
    numero: "",
    tipo: "",
    capacidade: "",
    quantidadeComputadores: "",
    equipamentos: "",
    softwares: "",
    capacidadePCD: "",
    responsavel: "",
    observacoes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.nome || !formData.codigo || !formData.tipo) {
      setError("Os campos Nome, Código e Tipo são obrigatórios.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/laboratorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (response.ok) {
        alert("Laboratório cadastrado com sucesso!");
        navigate("/admin/laboratorios");
      } else {
        setError("Erro ao cadastrar laboratório.");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Erro de conexão.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col w-full p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cadastrar Laboratório</h2>
          <p className="text-gray-600 mb-6">
            Cadastre um novo laboratório no SIGEF. Adicione as informações sobre o novo laboratório.
          </p>

          {/* Exibição de erro */}
          {error && <div className="text-red-600 mb-4 text-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {/* Informações Gerais */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Informações Gerais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome do laboratório"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-600">Código</label>
                  <input
                    id="codigo"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Código de identificação"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Localização</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="bloco" className="block text-sm font-medium text-gray-600">Bloco Didático</label>
                  <input
                    id="bloco"
                    name="bloco"
                    value={formData.bloco}
                    onChange={handleChange}
                    placeholder="Bloco"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="numero" className="block text-sm font-medium text-gray-600">Número</label>
                  <input
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Número"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Estrutura e Capacidade */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Estrutura e Capacidade</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-600">Tipo de Laboratório</label>
                  <input
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    placeholder="Tipo do laboratório"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="capacidade" className="block text-sm font-medium text-gray-600">Capacidade</label>
                  <input
                    id="capacidade"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    placeholder="Capacidade"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="quantidadeComputadores" className="block text-sm font-medium text-gray-600">Quantidade de Computadores</label>
                  <input
                    id="quantidadeComputadores"
                    name="quantidadeComputadores"
                    value={formData.quantidadeComputadores}
                    onChange={handleChange}
                    placeholder="Quantidade de computadores"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="equipamentos" className="block text-sm font-medium text-gray-600">Equipamentos Disponíveis</label>
                  <input
                    id="equipamentos"
                    name="equipamentos"
                    value={formData.equipamentos}
                    onChange={handleChange}
                    placeholder="Equipamentos disponíveis"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Observações</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="observacoes" className="block text-sm font-medium text-gray-600">Observações</label>
                  <input
                    id="observacoes"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    placeholder="Observações (opcional)"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="responsavel" className="block text-sm font-medium text-gray-600">Responsável</label>
                  <input
                    id="responsavel"
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    placeholder="Responsável"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin/laboratorios")}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 text-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar Laboratório"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarLaboratorio;
