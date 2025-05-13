import React from 'react';
import { useNavigate } from 'react-router-dom';

function NovaSenha() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-green-700">SIGEF</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-black-800">Nova Senha</h2>
            <p className="text-sm text-gray-600">
              Insira a nova senha para sua conta.
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              Nova senha:
            </label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirmar nova senha:
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

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Finalizar Recuperação de Senha
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full flex justify-center py-2 px-4 border border-red-500 rounded-lg shadow-sm text-sm font-medium text-red-500 hover:text-white bg-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaSenha;