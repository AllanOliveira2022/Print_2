import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import professorService from '../../services/professorService.js';

function LoginProf() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!senha) {
      setError("Por favor, insira a senha.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await professorService.login({ email, senha });
      const { token, usuario } = response;
      
      // Armazena os dados no localStorageAdd commentMore actions
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));


      setSuccess(true);
      setTimeout(() => {
        navigate("/professor/espacos");
      }, 1500);
    } catch (err) {
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex flex-row items-center w-1/4 py-2 text-gray-500 uppercase hover:text-gray-700 transition-colors"
          >
            <IoArrowBackSharp className="w-2/6"/>
            Voltar
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">SIGEF</h1>
          <p className="mt-1 text-2xl text-gray-700">Login - Professor</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            Login efetuado com sucesso! Redirecionando...
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              placeholder="Email"
              className="w-full px-2 py-2 border border-gray-200 bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
              required
              placeholder="Senha"
              className="w-full px-2 py-2 border border-gray-200 bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-green-600 border-2 border-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors uppercase"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/register/professor")}
            type="button"
            disabled={loading}
            className="w-full px-6 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-100 transition-colors"
          >
            Criar Conta
          </button>

          <div className="text-center space-y-2">
            <button
              onClick={() => navigate("/recuperarSenha")}
              type="button"
              disabled={loading}
              className="text-sm font-semibold text-green-600 hover:text-green-700 focus:outline-none uppercase"
            >
              Recuperar a senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginProf;
