import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
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

    setTimeout(() => {
      if (email === "admin@exemplo.com" && senha === "123456") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/espacos");
        }, 1500);
      } else {
        setError("Email ou senha incorretos.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">SIGEF</h1>
          <p className="mt-1 text-2xl text-gray-700">Login - Administrador</p>
        </div>

        {/* Mensagens de erro e sucesso */}
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
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
                if (success) setSuccess(false);
              }}
              required
              disabled={loading}
              placeholder="seu@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                if (error) setError(null);
                if (success) setSuccess(false);
              }}
              required
              disabled={loading}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center min-h-[52px] py-3 px-3 rounded-lg text-lg font-semibold text-white bg-green-600 border border-transparent shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </button>
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              type="button"
              disabled={loading}
              className="text-sm text-green-600 hover:underline focus:outline-none"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
