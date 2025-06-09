import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";
import espacoService from "../../../services/espacoService";
import tipoService from "../../../services/tipoService";
import blocoService from "../../../services/blocoService";
import { MdAdd } from "react-icons/md";
/*Modals*/
import TipoModal from "../../../components/modals/tipoModal/tipoModal";
import BlocoModal from "../../../components/modals/blocoModal/blocoModal";

function EditarEspaco() {
  const { id } = useParams(); // Pega o ID do espaço da URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    codigoIdentificacao: "",
    tipoId: "",
    blocoId: "",
    andar: "",
    capacidade: "",
    capacidadePCD: false,
    situacao: "Disponivel",
    responsavel: "",
    observacoes: "",
    equipamentos: [],
  });

  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showBlocoModal, setShowBlocoModal] = useState(false);

  const handleNovosTiposAdicionados = async () => {
    await fetchTipos(); // Re-fetch types after a new one is added
  };

  const handleNovosBlocosAdicionados = async () => {
    await fetchBlocos(); // Re-fetch blocks after a new one is added
  };

  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: "",
    quantidade: "",
  });

  const [tipos, setTipos] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false); // Renamed to avoid confusion with other modals
  const [loading, setLoading] = useState(true); // Start as true for initial data fetch
  const [error, setError] = useState(null);

  // --- Funções para carregar dados de Tipos e Blocos ---
  const fetchTipos = async () => {
    try {
      const response = await tipoService.listarTodos();
      // Ensure data is an array
      const data = Array.isArray(response) ? response : response.data || [];
      setTipos(data);
    } catch (err) {
      console.error("Erro ao carregar tipos:", err.message, err.stack);
      setError("Erro ao carregar tipos. Tente novamente.");
    }
  };

  const fetchBlocos = async () => {
    try {
      const response = await blocoService.listarTodos();
      // Ensure data is an array
      const data = Array.isArray(response) ? response : response.data || [];
      setBlocos(data);
    } catch (err) {
      console.error("Erro ao carregar blocos:", err.message, err.stack);
      setError("Erro ao carregar blocos. Tente novamente.");
    }
  };

  // --- useEffect para carregar dados do espaço, tipos e blocos ao montar o componente ---
  useEffect(() => {
    const fetchEspacoAndDependencies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch dependencies first
        await Promise.all([fetchTipos(), fetchBlocos()]);

        // Then fetch space data
        const espacoData = await espacoService.buscarPorId(id);
        if (espacoData) {
          setFormData({
            nome: espacoData.nome || "",
            codigoIdentificacao: espacoData.codigoIdentificacao || "",
            // Ensure typeId and blocoId are numbers and match the option values
            tipoId: espacoData.tipoId ? parseInt(espacoData.tipoId) : "",
            blocoId: espacoData.blocoId ? parseInt(espacoData.blocoId) : "",
            andar: espacoData.andar || "",
            capacidade: espacoData.capacidade || "",
            capacidadePCD: espacoData.capacidadePCD || false,
            situacao: espacoData.situacao || "Disponivel",
            responsavel: espacoData.responsavel || "",
            observacoes: espacoData.observacoes || "",
            // Use existing 'id' if present, otherwise generate a temporary one for React keys
            equipamentos: Array.isArray(espacoData.equipamentos)
              ? espacoData.equipamentos.map((eq) => ({
                  ...eq,
                  // Use existing 'id' if available from backend, else generate a temporary one.
                  // This is crucial for React's list rendering to be stable.
                  id: eq.id || Date.now() + Math.random(), // Prefer backend ID
                }))
              : [],
          });
        } else {
          setError("Espaço não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao carregar dados do espaço:", err);
        setError("Erro ao carregar dados do espaço. Verifique o ID e tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchEspacoAndDependencies();
  }, [id]);

  // --- Função handleChange para atualizar o formData ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => {
      if (name === "capacidadePCD") {
        return {
          ...prevFormData,
          [name]: value === "true" ? true : false,
        };
      } else if (
        name === "tipoId" ||
        name === "blocoId" ||
        name === "capacidade" ||
        name === "andar"
      ) {
        // Allow empty string for optional numeric fields, otherwise convert to int
        return {
          ...prevFormData,
          [name]: value === "" ? "" : parseInt(value),
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  // --- Funções para gerenciar equipamentos ---
  const adicionarEquipamento = () => {
    if (novoEquipamento.nome.trim() && novoEquipamento.quantidade.trim()) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        equipamentos: [
          ...prevFormData.equipamentos,
          {
            id: Date.now() + Math.random(), // Still generating a temporary ID for new additions
            nome: novoEquipamento.nome.trim(),
            quantidade: parseInt(novoEquipamento.quantidade) || 1,
          },
        ],
      }));
      setNovoEquipamento({ nome: "", quantidade: "" });
    }
  };

  const removerEquipamento = (idToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      equipamentos: prevFormData.equipamentos.filter((eq) => eq.id !== idToRemove),
    }));
  };

  const editarEquipamento = (idToEdit, campo, valor) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      equipamentos: prevFormData.equipamentos.map((eq) =>
        eq.id === idToEdit
          ? { ...eq, [campo]: campo === "quantidade" ? parseInt(valor) || 1 : valor }
          : eq
      ),
    }));
  };

  // --- Função para preparar os dados antes do envio (remover IDs temporários, tratar nulos) ---
  const prepararDadosParaEnvio = (dados) => {
    return {
      nome: dados.nome,
      codigoIdentificacao: dados.codigoIdentificacao,
      tipoId: dados.tipoId || null,
      blocoId: dados.blocoId || null,
      andar: dados.andar === "" ? null : dados.andar,
      capacidade: dados.capacidade === "" ? null : parseInt(dados.capacidade),
      capacidadePCD: dados.capacidadePCD,
      situacao: dados.situacao,
      responsavel: dados.responsavel || null,
      observacoes: dados.observacoes || null,
      // Only send 'nome' and 'quantidade' for equipments
      equipamentos: dados.equipamentos.map(({ nome, quantidade }) => ({ nome, quantidade })),
    };
  };

  // --- Função handleSubmit para enviar os dados atualizados ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.nome.trim()) {
      setError("Nome do espaço é obrigatório.");
      return;
    }
    if (!formData.codigoIdentificacao.trim()) {
      setError("Código de identificação é obrigatório.");
      return;
    }
    if (!formData.tipoId) {
      setError("Tipo do espaço é obrigatório.");
      return;
    }
    if (!formData.blocoId) {
      setError("Bloco é obrigatório.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dadosParaEnvio = prepararDadosParaEnvio(formData);
      console.log("Dados atualizados enviados para o backend:", dadosParaEnvio);
      await espacoService.editar(id, dadosParaEnvio); // Chama o serviço de atualização com o ID
      alert("Espaço atualizado com sucesso!");
      navigate("/admin/espacos");
    } catch (error) {
      console.error("Erro ao atualizar espaço:", error);
      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || error.response.data?.error;
        if (status === 400) {
          if (message.includes("tipoId")) {
            setError("Tipo inválido. Selecione um tipo válido.");
          } else if (message.includes("blocoId")) {
            setError("Bloco inválido. Selecione um bloco válido.");
          } else {
            setError(message || "Dados inválidos. Verifique as informações fornecidas.");
          }
        } else if (status === 404) {
            setError("Espaço não encontrado. Verifique o ID.");
        }
        else if (status === 409) {
          setError("Já existe um espaço com este código. Escolha um código diferente.");
        } else if (status === 500) {
          setError("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          setError(message || "Erro ao atualizar espaço. Tente novamente.");
        }
      } else if (error.request) {
        setError("Erro de conexão. Verifique sua internet e tente novamente.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Funções para o modal de cancelamento ---
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate("/admin/espacos");
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  // --- Renderização condicional para o estado de carregamento e erro inicial ---
  if (loading && !formData.nome) { // Only show loading spinner if data is not yet loaded
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Menu />
        <div className="flex flex-col w-full p-8 items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Carregando dados do espaço...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.nome) { // Only show error if data failed to load initially
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Menu />
        <div className="flex flex-col w-full p-8 items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/admin/espacos")}
              className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-semibold"
            >
              Voltar para Espaços
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <Menu />
      <div className="flex justify-center w-full p-4 md:p-8">
        <div className="w-full max-w-7xl bg-gray-50 shadow-md p-6 mt-4">
          <div className="flex flex-col mb-6 gap-4">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Editar Espaço
            </h1>
            <p className="text-gray-600">
              Edite as informações do espaço existente.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
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
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Informações Gerais
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Espaço *
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="tipoId"
                      value={formData.tipoId}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                      required
                      disabled={loading}
                    >
                      <option value="" disabled>
                        Selecione um tipo de espaço
                      </option>
                      {tipos.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowTipoModal(true)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                      Adicionar
                    </button>
                  </div>
                  {tipos.length === 0 && !loading && (
                    <p className="text-sm text-red-500 mt-1">
                      Nenhum tipo de espaço cadastrado.
                    </p>
                  )}

                  {showTipoModal && (
                    <TipoModal
                      isOpen={showTipoModal}
                      onClose={() => setShowTipoModal(false)}
                      onConfirm={handleNovosTiposAdicionados}
                    />
                  )}
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
                    name="codigoIdentificacao"
                    value={formData.codigoIdentificacao}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Localização
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bloco Didático *
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      name="blocoId"
                      value={formData.blocoId}
                      onChange={handleChange}
                      className="w-5/6 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                      required
                      disabled={loading}
                    >
                      <option value="" disabled>
                        Seleccione um bloco didático
                      </option>
                      {blocos.map((bloco) => (
                        <option key={bloco.id} value={bloco.id}>
                          {bloco.nome}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowBlocoModal(true)}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                      Adicionar
                    </button>
                  </div>
                  {blocos.length === 0 && !loading && (
                    <p className="text-sm text-red-500 mt-1">
                      Nenhum bloco didático cadastrado.
                    </p>
                  )}
                  {showBlocoModal && (
                    <BlocoModal
                      isOpen={showBlocoModal}
                      onClose={() => setShowBlocoModal(false)}
                      onConfirm={handleNovosBlocosAdicionados}
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Andar
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="andar"
                    value={formData.andar}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Estrutura e Capacidade
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Equipamentos Disponíveis
                  </label>
                  <div className="bg-gray-50 p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Nome do Equipamento
                        </label>
                        <input
                          type="text"
                          value={novoEquipamento.nome}
                          onChange={(e) =>
                            setNovoEquipamento({
                              ...novoEquipamento,
                              nome: e.target.value,
                            })
                          }
                          placeholder="Ex: Computador, Projetor..."
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
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
                          onChange={(e) =>
                            setNovoEquipamento({
                              ...novoEquipamento,
                              quantidade: e.target.value,
                            })
                          }
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={adicionarEquipamento}
                          disabled={loading}
                          className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                        >
                          Adicionar Equipamento
                        </button>
                      </div>
                    </div>
                  </div>
                  {formData.equipamentos.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Equipamentos Cadastrados ({formData.equipamentos.length})
                      </h4>
                      {formData.equipamentos.map((equipamento) => (
                        <div
                          key={equipamento.id} // This is the crucial part for stable rendering
                          className="flex items-center gap-3 bg-white p-3 border"
                        >
                          <input
                            type="text"
                            value={equipamento.nome}
                            onChange={(e) =>
                              editarEquipamento(
                                equipamento.id,
                                "nome",
                                e.target.value
                              )
                            }
                            className="flex-1 px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
                            disabled={loading}
                          />
                          <input
                            type="number"
                            min="1"
                            value={equipamento.quantidade}
                            onChange={(e) =>
                              editarEquipamento(
                                equipamento.id,
                                "quantidade",
                                e.target.value
                              )
                            }
                            className="w-20 px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
                            disabled={loading}
                          />
                          <button
                            type="button"
                            onClick={() => removerEquipamento(equipamento.id)}
                            disabled={loading}
                            className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex col-span-2 gap-5">
                  <div className="w-2/5 block mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Capacidade Total
                    </label>
                    <input
                      type="number"
                      name="capacidade"
                      value={formData.capacidade}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      min="0"
                    />
                  </div>

                  <div className="w-3/5 block mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      Capacidade para PCD
                    </label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="capacidadePCD"
                          value="true"
                          checked={formData.capacidadePCD === true}
                          onChange={handleChange}
                          disabled={loading}
                          className="appearance-none h-5 w-5 border-2 border-green-600 rounded-full checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                        />
                        <span>Sim</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="capacidadePCD"
                          value="false"
                          checked={formData.capacidadePCD === false}
                          onChange={handleChange}
                          disabled={loading}
                          className="appearance-none h-5 w-5 border-2 border-green-600 rounded-full checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
                        />
                        <span>Não</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-sm">
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
                    className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-green-600"
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
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                {loading && (
                  <div className="animate-spin h-4 w-4 border-b-2 border-white"></div>
                )}
                {loading ? "Atualizando..." : "Atualizar Espaço"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Cancelar edição?
            </h3>
            <p className="text-gray-600 mb-6">
              Deseja realmente cancelar a edição deste espaço? Todas as
              alterações não salvas serão perdidas.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseCancelModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 hover:bg-gray-100 transition-colors font-medium"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
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

export default EditarEspaco;