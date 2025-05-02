import { Link, useNavigate } from "react-router-dom";

function RecuperarSenha() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica de validação/submissão se necessário
    navigate("/novaSenha"); // Redireciona para a página de nova senha
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-700">SIGEF</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">Recuperar Senha</h2>
            <p className="text-sm text-gray-600">
              Insira o email cadastrado no SIGEF
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="seu@email.com"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Continuar recuperação de senha
            </button>

            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecuperarSenha;