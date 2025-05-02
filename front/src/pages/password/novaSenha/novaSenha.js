import { Link } from "react-router-dom";

function NovaSenha() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700">SIGEF</h1>
          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Redefinir Senha</h2>
          <p className="mt-2 text-sm text-gray-600">
            Crie uma nova senha para sua conta
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md">
          <div className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Nova Senha
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Mínimo de 8 caracteres, incluindo letras e números
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirmar Nova Senha
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Finalizar Recuperação
            </button>

            <Link
              to="/login"
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

export default NovaSenha;