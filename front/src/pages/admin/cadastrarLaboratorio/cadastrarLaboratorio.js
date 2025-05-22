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
    equipamentos: [], // Agora é um array de objetos
    softwares: "",
    capacidadePCD: "",
    responsavel: "",
    observacoes: "",
  });

  // Estados para o formulário de equipamentos
  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: "",
    quantidade: ""
  });

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para adicionar equipamento
  const adicionarEquipamento = () => {
    if (novoEquipamento.nome.trim() && novoEquipamento.quantidade.trim()) {
      setFormData({
        ...formData,
        equipamentos: [...formData.equipamentos, {
          id: Date.now(), // ID único simples
          nome: novoEquipamento.nome.trim(),
          quantidade: parseInt(novoEquipamento.quantidade) || 1
        }]
      });
      setNovoEquipamento({ nome: "", quantidade: "" });
    }
  };

  // Função para remover equipamento
  const removerEquipamento = (id) => {
    setFormData({
      ...formData,
      equipamentos: formData.equipamentos.filter(eq => eq.id !== id)
    });
  };

  // Função para editar equipamento inline
  const editarEquipamento = (id, campo, valor) => {
    setFormData({
      ...formData,
      equipamentos: formData.equipamentos.map(eq => 
        eq.id === id 
          ? { ...eq, [campo]: campo === 'quantidade' ? parseInt(valor) || 1 : valor }
          : eq
      )
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/laboratorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Laboratório cadastrado com sucesso!");
        navigate("/admin/laboratorios");
      } else {
        alert("Erro ao cadastrar laboratório.");
      }
    } catch (error) {
      alert("Erro de conexão.");
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

  const blocosDidaticos = [
    { value: "", label: "Selecione um bloco" },
    { value: "Bloco A", label: "Bloco A" },
    { value: "Bloco B", label: "Bloco B" },
    { value: "Bloco C", label: "Bloco C" },
  ];

  const tiposEspaco = [
    { value: "", label: "Selecione o tipo" },
    { value: "Laboratório de Informática", label: "Laboratório de Informática" },
    { value: "Sala de Aula", label: "Sala de Aula" },
    { value: "Auditório", label: "Auditório" },
    { value: "Sala de Reunião", label: "Sala de Reunião" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
          <div className="flex flex-col mb-6 gap-4">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Cadastrar Espaço
            </h1>
            <p className="text-gray-600">
              Cadastre um novo espaço no sistema. Preencha todas as informações necessárias.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Gerais */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Informações Gerais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Espaço *
                  </label>
                  <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código de Identificação *
                  </label>
                  <input
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Localização
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bloco Didático
                  </label>
                  <select
                    name="bloco"
                    value={formData.bloco}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                  >
                    {blocosDidaticos.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <input
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Estrutura e Capacidade */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Estrutura e Capacidade
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Espaço
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                  >
                    {tiposEspaco.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacidade Total
                  </label>
                  <input
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                  />
                </div>
                
                {/* Seção de Equipamentos Reformulada */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Equipamentos Disponíveis
                  </label>
                  
                  {/* Formulário para adicionar equipamento */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Nome do Equipamento
                        </label>
                        <input
                          type="text"
                          value={novoEquipamento.nome}
                          onChange={(e) => setNovoEquipamento({...novoEquipamento, nome: e.target.value})}
                          placeholder="Ex: Computador, Projetor..."
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={novoEquipamento.quantidade}
                          onChange={(e) => setNovoEquipamento({...novoEquipamento, quantidade: e.target.value})}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={adicionarEquipamento}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lista de equipamentos adicionados */}
                  {formData.equipamentos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Equipamentos Cadastrados ({formData.equipamentos.length})
                      </h4>
                      {formData.equipamentos.map((equipamento) => (
                        <div key={equipamento.id} className="flex items-center gap-3 bg-white p-3 rounded border">
                          <input
                            type="text"
                            value={equipamento.nome}
                            onChange={(e) => editarEquipamento(equipamento.id, 'nome', e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                          />
                          <input
                            type="number"
                            min="1"
                            value={equipamento.quantidade}
                            onChange={(e) => editarEquipamento(equipamento.id, 'quantidade', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                          />
                          <button
                            type="button"
                            onClick={() => removerEquipamento(equipamento.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Capacidade para PCD
                  </label>
                  <div className="flex items-center space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="capacidadePCD"
                        value="Sim"
                        checked={formData.capacidadePCD === "Sim"}
                        onChange={handleChange}
                        className="before:content[''] peer relative h-5 w-5 appearance-none rounded-full border border-gray-300 transition-all before:absolute before:h-full before:w-full before:rounded-full before:bg-green-600 before:opacity-0 before:transition-opacity checked:border-green-600 checked:before:opacity-100"
                      />
                      <span className="ml-2 text-gray-700">Sim</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="capacidadePCD"
                        value="Não"
                        checked={formData.capacidadePCD === "Não"}
                        onChange={handleChange}
                        className="before:content[''] peer relative h-5 w-5 appearance-none rounded-full border border-gray-300 transition-all before:absolute before:h-full before:w-full before:rounded-full before:bg-green-600 before:opacity-0 before:transition-opacity checked:border-green-600 checked:before:opacity-100"
                      />
                      <span className="ml-2 text-gray-700">Não</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Observações
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsável
                  </label>
                  <input
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-medium"
              >
                Cadastrar Laboratório
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Cancelar cadastro?</h3>
            <p className="text-gray-600 mb-6">
              Deseja realmente cancelar o cadastro deste laboratório? Todas as informações não salvas serão perdidas.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors font-medium"
              >
                Continuar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white uppercase hover:bg-red-700 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastrarLaboratorio;