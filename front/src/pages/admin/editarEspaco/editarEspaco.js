import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";
import espacoService from "../../../services/espacoService";
import tipoService from "../../../services/tipoService";
import blocoService from "../../../services/blocoService";
import TipoModal from "../../../components/modals/tipoModal/tipoModal";
import BlocoModal from "../../../components/modals/blocoModal/blocoModal";

function EditarEspaco() {
  const { id } = useParams();
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
  const [novoEquipamento, setNovoEquipamento] = useState({
    nome: "",
    quantidade: "",
  });
  const [tipos, setTipos] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carrega tipos e blocos
  const fetchTipos = async () => {
    try {
      const response = await tipoService.listarTodos();
      setTipos(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      setError("Erro ao carregar tipos. Tente novamente.");
    }
  };

  const fetchBlocos = async () => {
    try {
      const response = await blocoService.listarTodos();
      setBlocos(Array.isArray(response) ? response : response.data || []);
    } catch (err) {
      setError("Erro ao carregar blocos. Tente novamente.");
    }
  };

  // Carrega dados do espaço
  const fetchEspaco = async () => {
    setLoading(true);
    try {
      const data = await espacoService.buscarPorId(id);

      // Aguarda tipos e blocos serem carregados antes de mapear nomes para IDs
      let tiposData = tipos;
      let blocosData = blocos;
      if (tipos.length === 0) {
        const tiposResp = await tipoService.listarTodos();
        tiposData = Array.isArray(tiposResp) ? tiposResp : tiposResp.data || [];
        setTipos(tiposData);
      }
      if (blocos.length === 0) {
        const blocosResp = await blocoService.listarTodos();
        blocosData = Array.isArray(blocosResp) ? blocosResp : blocosResp.data || [];
        setBlocos(blocosData);
      }

      // Mapeia nomeTipo/nomeBloco para seus respectivos IDs
      const tipoId =
        tiposData.find((t) => t.nome === data.nomeTipo)?.id ||
        data.tipoId ||
        "";
      const blocoId =
        blocosData.find((b) => b.nome === data.nomeBloco)?.id ||
        data.blocoId ||
        "";

      // Se o backend retornar equipamentos como string, parse para array
      let equipamentos = [];
      if (
        data.equipamentos &&
        typeof data.equipamentos === "string" &&
        data.equipamentos !== "Nenhum equipamento associado."
      ) {
        equipamentos = data.equipamentos
          .split("; ")
          .map((item) => {
            const match = item.match(/(.+)\s\((\d+)\)/);
            if (match) {
              return {
                id: Date.now() + Math.random(),
                nome: match[1].trim(),
                quantidade: parseInt(match[2]) || 1,
              };
            }
            return null;
          })
          .filter(Boolean);
      } else if (Array.isArray(data.equipamentos)) {
        equipamentos = data.equipamentos.map((eq) => ({
          id: Date.now() + Math.random(),
          nome: eq.nome,
          quantidade: eq.quantidade,
        }));
      }

      setFormData({
        nome: data.nome || "",
        codigoIdentificacao: data.codigoIdentificacao || "",
        tipoId: tipoId,
        blocoId: blocoId,
        andar: data.andar || "",
        capacidade: data.capacidade || "",
        capacidadePCD:
          data.capacidadePCD === true ||
          data.capacidadePCD === 1 ||
          data.capacidadePCD === "1" ||
          data.capacidadePCD === "true"
            ? true
            : false,
        situacao: data.situacao || "Disponivel",
        responsavel: data.responsavel || "",
        observacoes: data.observacoes || "",
        equipamentos,
      });
    } catch (err) {
      setError("Erro ao carregar espaço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
    fetchBlocos();
    fetchEspaco();
    // eslint-disable-next-line
  }, [id]);

  const handleNovosTiposAdicionados = async () => {
    await fetchTipos();
  };

  const handleNovosBlocosAdicionados = async () => {
    await fetchBlocos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "capacidadePCD") {
        return { ...prev, [name]: value === "true" };
      } else if (
        name === "tipoId" ||
        name === "blocoId" ||
        name === "capacidade" ||
        name === "andar"
      ) {
        return { ...prev, [name]: parseInt(value) || "" };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const adicionarEquipamento = () => {
    if (novoEquipamento.nome.trim() && novoEquipamento.quantidade.trim()) {
      setFormData((prev) => ({
        ...prev,
        equipamentos: [
          ...prev.equipamentos,
          {
            id: Date.now(),
            nome: novoEquipamento.nome.trim(),
            quantidade: parseInt(novoEquipamento.quantidade) || 1,
          },
        ],
      }));
      setNovoEquipamento({ nome: "", quantidade: "" });
    }
  };

  const removerEquipamento = (id) => {
    setFormData((prev) => ({
      ...prev,
      equipamentos: prev.equipamentos.filter((eq) => eq.id !== id),
    }));
  };

  const editarEquipamento = (id, campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      equipamentos: prev.equipamentos.map((eq) =>
        eq.id === id
          ? { ...eq, [campo]: campo === "quantidade" ? parseInt(valor) || 1 : valor }
          : eq
      ),
    }));
  };

  const prepararDadosParaEnvio = (dados) => ({
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
    equipamentos: dados.equipamentos.map(({ id, ...eq }) => eq),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      await espacoService.editar(id, dadosParaEnvio);
      alert("Espaço atualizado com sucesso!");
      navigate("/admin/espacos");
    } catch (error) {
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
        } else if (status === 409) {
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

  const handleCancel = () => setShowModal(true);
  const handleConfirmCancel = () => {
    setShowModal(false);
    navigate("/admin/espacos");
  };
  const handleCloseModal = () => setShowModal(false);

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
              Edite as informações do espaço no sistema. Preencha todas as informações necessárias.
            </p>
          </div>
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
                  <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
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
                  {tipos.length === 0 && (
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
                        Selecione um bloco didático
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
                  {blocos.length === 0 && (
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
                          Cadastrar Equipamento
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
                          key={equipamento.id}
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
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Cancelar edição?
            </h3>
            <p className="text-gray-600 mb-6">
              Deseja realmente cancelar a edição deste espaço? Todas as alterações
              não salvas serão perdidas.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
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