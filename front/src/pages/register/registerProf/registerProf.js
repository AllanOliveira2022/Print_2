import { Link } from "react-router-dom";

function RegisterProf() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
  
          <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-md">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-green-700">SIGEF</h1>
              <h2 className="mt-6 text-2xl font-semibold text-gray-800">Criar conta - Professor</h2>
            </div>
            <div className="space-y-4">
                <div>
                  <label htmlFor="institutional-code" className="block text-sm font-medium text-gray-700">
                    Código Institucional
                  </label>
                  <input
                    id="institutional-code"
                    name="institutional-code"
                    type="text"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Código"
                  />
              </div>
  
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Seu nome completo"
                />
              </div>
  
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
  
              <div>
                <label htmlFor="area-atuacao" className="block text-sm font-medium text-gray-700">
                  Área de Atuação
                </label>
                <input
                  id="area-atuacao"
                  name="area-atuacao"
                  type="text"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Sua área de especialização"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirmar Senha
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
            </div>
  
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Criar Conta
              </button>
  
              <Link
                to="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Já tenho uma conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default RegisterProf;