import { Link } from 'react-router-dom';
import Menu from '../../components/tecLab/menu/menu';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className='text-center'>
          <h1 className="text-4xl font-bold text-green-700">SIGEF</h1>
          <h2 className="mt-4 text-2xl font-semibold text-black-800">Entrar na conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Entre na sua conta SIGEF ou crie uma nova
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Login:
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha:
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
          </div>

          <div className="space-y-3">
            <Link
              to="/admin/laboratorios"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Entrar na Conta
            </Link>

            <Link
              to="/select-account"
              className="w-full flex justify-center py-2 px-4 border border-green-600 rounded-lg shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-100 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Criar Conta
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Link 
              to="/recuperarSenha" 
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Recuperar Senha
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;