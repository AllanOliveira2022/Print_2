import { useEffect, useState } from "react";
import MenuProfessor from "../../../components/professor/menu/menu";
import professorService from "../../../services/professorService"; // Importe o serviço de professor
import { useNavigate } from "react-router-dom"; // Importe o useNavigate

function PerfilProfessor() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const navigate = useNavigate(); // Hook para navegação

  const [perfil, setPerfil] = useState({
    nome: "",
    email: "",
    senha: "",
    codigo_institucional: "",
    area_atuacao: "",
  });

  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Estado para controlar o modal de confirmação

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const dados = await professorService.buscarPorId(userId);
        setPerfil({
          nome: dados.nome,
          email: dados.email,
          senha: "", // nunca traga a senha original, deixe vazia
          codigo_institucional: dados.Professor.codigo_institucional,
          area_atuacao: dados.Professor.area_atuacao,
        });
      } catch (err) {
        console.error("Erro ao carregar perfil:", err.message);
      }
    }

    if (userId) carregarPerfil();
  }, [userId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  }

  function handleConfirmaSenhaChange(e) {
    setConfirmaSenha(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);
    setErro(null);

    if (perfil.senha !== "" && perfil.senha !== confirmaSenha) {
      setErro("As senhas não conferem.");
      return;
    }

    const dadosParaEnviar = {
      nome: perfil.nome,
      email: perfil.email,
      codigo_institucional: perfil.codigo_institucional,
      area_atuacao: perfil.area_atuacao,
    };
    if (perfil.senha !== "") {
      dadosParaEnviar.senha = perfil.senha;
    }

    setLoading(true);
    try {
      await professorService.editar(userId, dadosParaEnviar);
      setMensagem("Perfil atualizado com sucesso!");
      setPerfil((prev) => ({ ...prev, senha: "" }));
      setConfirmaSenha("");

      // Atualiza o localStorage com os novos dados
      const usuarioAtual = JSON.parse(localStorage.getItem("user")) || {};
      usuarioAtual.nome = dadosParaEnviar.nome || usuarioAtual.nome;
      usuarioAtual.email = dadosParaEnviar.email || usuarioAtual.email;
      usuarioAtual.codigo_institucional = dadosParaEnviar.codigo_institucional || usuarioAtual.codigo_institucional;
      localStorage.setItem("user", JSON.stringify(usuarioAtual));
    } catch (error) {
      setErro(error.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  // Função para lidar com a exclusão da conta
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await professorService.excluir(userId);
      
      // Limpa o localStorage e redireciona para a página inicial
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      setErro(error.message || "Erro ao excluir conta.");
    } finally {
      setLoading(false);
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen bg-white items-center">
      <MenuProfessor />
      <div className="flex justify-center items-center w-full h-full p-4 md:p-8">
        <div className="w-full max-w-4xl bg-gray-50 shadow-md p-6 mt-4 rounded-xl">
          <div className="flex flex-col mb-6 gap">
            <h1 className="text-2xl font-bold text-green-800 text-left">
              Perfil Professor
            </h1>
            <p className="text-gray-600">
              Veja as informações do seu perfil e edite-as conforme o necessário.
            </p>
          </div>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código Institucional
                </label>
                <input
                  name="codigo_institucional"
                  value={perfil.codigo_institucional}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  name="nome"
                  value={perfil.nome}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Área de Atuação
                </label>
                <input
                  name="area_atuacao"
                  value={perfil.area_atuacao}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  value={perfil.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  name="senha"
                  value={perfil.senha}
                  onChange={handleChange}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirme a Senha
                </label>
                <input
                  name="confirmaSenha"
                  value={confirmaSenha}
                  onChange={handleConfirmaSenhaChange}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

            {erro && (
              <div className="text-red-600 font-semibold">{erro}</div>
            )}
            {mensagem && (
              <div className="text-green-600 font-semibold">{mensagem}</div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(true)}
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-semibold"
              >
                Excluir Conta
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-semibold ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-100"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Excluindo..." : "Confirmar Exclusão"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilProfessor;