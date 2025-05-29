import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";
import espacoService from "../../../services/espacoService"; // Ajuste o caminho conforme sua estrutura

function CadastrarEspaco() {
  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    bloco: "",
    numero: "",
    tipo: "",
    capacidade: "",
    quantidadeComputadores: "",
    equipamentos: [], // Array de objetos
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

  // Estados para controle de UI
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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

  // Função para preparar dados para envio
  const prepararDadosParaEnvio = (dados) => {
    return {
      ...dados,
      capacidade: dados.capacidade ? parseInt(dados.capacidade) : null,
      quantidadeComputadores: dados.quantidadeComputadores ? parseInt(dados.quantidadeComputadores) : null,
      numero: dados.numero || null,
      // Remove o ID temporário dos equipamentos antes de enviar
      equipamentos: dados.equipamentos.map(({ id, ...eq }) => eq)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome.trim()) {
      setError("Nome do espaço é obrigatório");
      return;
    }
    
    if (!formData.codigo.trim()) {
      setError("Código de identificação é obrigatório");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dadosParaEnvio = prepararDadosParaEnvio(formData);
      
      await espacoService.cadastrar(dadosParaEnvio);
      
      // Sucesso - mostrar mensagem e redirecionar
      alert("Espaço cadastrado com sucesso!");
      navigate("/admin/espacos");
      
    } catch (error) {
      console.error("Erro ao cadastrar espaço:", error);
      
      // Tratamento de diferentes tipos de erro
      if (error.response) {
        // Erro da API (4xx, 5xx)
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;
        
        if (status === 400) {
          setError(message || "Dados inválidos. Verifique as informações fornecidas.");
        } else if (status === 409) {
          setError("Já existe um espaço com este código. Escolha um código diferente.");
        } else if (status === 500) {
          setError("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          setError(message || "Erro ao cadastrar espaço. Tente novamente.");
        }
      } else if (error.request) {
        // Erro de rede
        setError("Erro de conexão. Verifique sua internet e tente novamente.");
      } else {
        // Outros erros
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    setShowModal(false);
    navigate("/admin/espacos");
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

          {/* Exibição de erro */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Gerais */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Informações Gerais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Nome do Espaço *
                  </label>
                  <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    required
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    Andar
                  </label>
                  <input
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    disabled={loading}
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
                {/* Seção de Equipamentos */}
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
                          disabled={loading}
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
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={adicionarEquipamento}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loading}
                          />
                          <input
                            type="number"
                            min="1"
                            value={equipamento.quantidade}
                            onChange={(e) => editarEquipamento(equipamento.id, 'quantidade', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-600"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => removerEquipamento(equipamento.id)}
                            disabled={loading}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacidade Total
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    disabled={loading}
                  />
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
                        disabled={loading}
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
                        disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {loading ? 'Cadastrando...' : 'Cadastrar Espaço'}
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
              Deseja realmente cancelar o cadastro deste espaço? Todas as informações não salvas serão perdidas.
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

export default CadastrarEspaco;