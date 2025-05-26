import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function EditarLaboratorio() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: "",
    codigoIdentificacao: "",
    blocoDidatico: "",
    numero: "",
    tipoLaboratorio: "",
    capacidade: "",
    quantidadeComputadores: "",
    equipamentosDisponiveis: "",
    softwaresInstalados: "",
    capacidadePCD: "",
    responsavel: "",
    observacoes: "",
    situacao: "Disponível"
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Carregar dados do laboratório ao montar componente
  useEffect(() => {
    async function fetchLaboratorio() {
      try {
        const response = await fetch(`http://localhost:5000/api/laboratorios/${id}`);
        if (response.ok) {
          const data = await response.json();
          const lab = data.laboratorio;
          setFormData({
            nome: lab.nome || "",
            codigoIdentificacao: lab.codigoIdentificacao || "",
            blocoDidatico: lab.blocoDidatico || "",
            numero: lab.numero || "",
            tipoLaboratorio: lab.tipoLaboratorio || "",
            capacidade: lab.capacidade?.toString() || "",
            quantidadeComputadores: lab.quantidadeComputadores?.toString() || "",
            equipamentosDisponiveis: lab.equipamentosDisponiveis || "",
            softwaresInstalados: lab.softwaresInstalados || "",
            capacidadePCD: lab.capacidadePCD || "",
            responsavel: lab.responsavel || "",
            observacoes: lab.observacoes || "",
            situacao: lab.situacao || "Disponível"
          });
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Erro ao carregar dados do laboratório.");
        }
      } catch (error) {
        console.error("Erro ao carregar laboratório:", error);
        setError("Erro de conexão ao carregar laboratório.");
      } finally {
        setLoading(false);
      }
    }
    fetchLaboratorio();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const submitData = {
        ...formData,
        capacidade: parseInt(formData.capacidade),
        quantidadeComputadores: parseInt(formData.quantidadeComputadores)
      };

      const response = await fetch(`http://localhost:5000/api/laboratorios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Laboratório atualizado com sucesso!");
        navigate("/admin/laboratorios");
      } else {
        setError(data.message || "Erro ao atualizar laboratório.");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      setError("Erro de conexão ao atualizar laboratório.");
    }
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    setShowModal(false);
    navigate("/admin/laboratorios");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Menu />
        <div className="flex flex-col w-full p-8 items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Carregando dados do laboratório...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.nome) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Menu />
        <div className="flex flex-col w-full p-8 items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/admin/laboratorios")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Voltar para Lista
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col w-full p-8 items-center">
        <div className="w-full max-w-6xl bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold text-black mb-2">Editar laboratório</h2>
          <p className="text-gray-500 mb-6">
            Atualize as informações do laboratório no SIGEF.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Gerais */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Informações Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Nome do laboratório:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Código de identificação:</label>
                  <input
                    type="text"
                    name="codigoIdentificacao"
                    value={formData.codigoIdentificacao}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Localização</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Bloco didático:</label>
                  <input
                    type="text"
                    name="blocoDidatico"
                    value={formData.blocoDidatico}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Número:</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Estrutura e Capacidade */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Estrutura e Capacidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Tipo de laboratório:</label>
                  <select
                    name="tipoLaboratorio"
                    value={formData.tipoLaboratorio}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="Informática">Informática</option>
                    <option value="Química">Química</option>
                    <option value="Física">Física</option>
                    <option value="Biologia">Biologia</option>
                    <option value="Eletrônica">Eletrônica</option>
                    <option value="Mecânica">Mecânica</option>
                    <option value="Multidisciplinar">Multidisciplinar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Capacidade total:</label>
                  <input
                    type="number"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Quantidade de computadores:</label>
                  <input
                    type="number"
                    name="quantidadeComputadores"
                    value={formData.quantidadeComputadores}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Capacidade para PCD:</label>
                  <select
                    name="capacidadePCD"
                    value={formData.capacidadePCD}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                    <option value="Parcial">Parcial</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Equipamentos disponíveis:</label>
                  <textarea
                    name="equipamentosDisponiveis"
                    value={formData.equipamentosDisponiveis}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Descreva os equipamentos disponíveis no laboratório"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Softwares instalados:</label>
                  <textarea
                    name="softwaresInstalados"
                    value={formData.softwaresInstalados}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Liste os softwares instalados"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Responsável e Observações */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Responsável e Observações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Responsável:</label>
                  <input
                    type="text"
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Situação:</label>
                  <select
                    name="situacao"
                    value={formData.situacao}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Ocupado">Ocupado</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-black mb-1">Observações (opcional):</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Observações adicionais sobre o laboratório"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-green-600 text-green-600 px-8 py-3 rounded hover:bg-red-700 hover:text-white hover:border-red-700 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded hover:bg-green-700 transition-colors duration-200"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-black mb-4">Cancelar edição do laboratório?</h3>
            <p className="text-sm text-gray-700 mb-8">
              Deseja realmente cancelar a edição deste laboratório? Ao cancelar, todas as alterações serão perdidas.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-white text-green-700 border border-green-600 px-6 py-2 rounded hover:bg-green-50 transition-colors duration-200"
              >
                Não, Continuar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-200"
              >
                Sim, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarLaboratorio;