import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function EditarLaboratorio() {
  const { id } = useParams(); // pegar o id do laboratório via rota
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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carregar dados do laboratório ao montar componente
  useEffect(() => {
    async function fetchLaboratorio() {
      // try {
      //   const response = await fetch(`/api/laboratorios/${id}`);
      //   if (response.ok) {
      //     const data = await response.json();
      //     setFormData({
      //       nome: data.nome || "",
      //       codigo: data.codigo || "",
      //       bloco: data.bloco || "",
      //       numero: data.numero || "",
      //       tipo: data.tipo || "",
      //       capacidade: data.capacidade || "",
      //       quantidadeComputadores: data.quantidadeComputadores || "",
      //       equipamentos: data.equipamentos || "",
      //       softwares: data.softwares || "",
      //       capacidadePCD: data.capacidadePCD || "",
      //       responsavel: data.responsavel || "",
      //       observacoes: data.observacoes || "",
      //     });
      //   } else {
      //     alert("Erro ao carregar dados do laboratório.");
      //     navigate("/admin/laboratorios");
      //   }
      // } catch (error) {
      //   alert("Erro de conexão ao carregar laboratório.");
      //   navigate("/admin/laboratorios");
      // } finally {
      //   setLoading(false);
      // }
    }
    fetchLaboratorio();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/laboratorios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Laboratório atualizado com sucesso!");
        navigate("/admin/laboratorios");
      } else {
        alert("Erro ao atualizar laboratório.");
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

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen bg-gray-100">
  //       <Menu />
  //       <div className="flex flex-col w-full p-8 items-center justify-center">
  //         <p>Carregando dados do laboratório...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Menu />
      <div className="flex flex-col w-full p-8 items-center">
        <div className="w-full max-w-6xl bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold text-black mb-2">Editar laboratório</h2>
          <p className="text-gray-500 mb-6">
            Atualize as informações do laboratório no SIGEF.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mesma estrutura de campos do cadastro */}
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Informações Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">Nome do laboratório:</label>
                  <input
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Código de identificação:</label>
                  <input
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Localização</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">Bloco didático:</label>
                  <input
                    name="bloco"
                    value={formData.bloco}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Número:</label>
                  <input
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Estrutura e Capacidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">Tipo de laboratório:</label>
                  <input
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Capacidade total:</label>
                  <input
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Quantidade de computadores:</label>
                  <input
                    name="quantidadeComputadores"
                    value={formData.quantidadeComputadores}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Equipamentos disponíveis:</label>
                  <input
                    name="equipamentos"
                    value={formData.equipamentos}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Softwares instalados:</label>
                  <input
                    name="softwares"
                    value={formData.softwares}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Capacidade para PCD:</label>
                  <input
                    name="capacidadePCD"
                    value={formData.capacidadePCD}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Observações</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black">Responsável:</label>
                  <input
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black">Observações (opcional):</label>
                  <input
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    className="w-full p-3 h-11 text-sm border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-green-600 text-green-600 px-10 py-3 rounded hover:bg-red-700 hover:text-white hover:border-red-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-10 py-3 rounded hover:bg-green-800"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-100">
          <div className="bg-white p-8 rounded shadow-lg w-85">
            <h3 className="text-xl font-semibold text-black mb-4">Cancelar edição do laboratório?</h3>
            <h5 className="text-sm font-semibold text-gray-700 mb-10">
              Deseja realmente cancelar a edição deste laboratório? Ao cancelar, todas as alterações serão perdidas.
            </h5>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-white-600 text-green-700 border border-green-600 px-10 py-3 rounded hover:bg-green-700 hover:text-white"
              >
                Não, Continuar
              </button>
              <button
                onClick={handleConfirmCancel}
                className="bg-red-500 text-white px-10 py-3 rounded hover:bg-red-700"
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
