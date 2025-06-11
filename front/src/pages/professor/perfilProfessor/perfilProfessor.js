import MenuProfessor from "../../../components/professor/menu/menu";

function PerfilProfessor() {
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

          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código Institucional
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Área de Atuação
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirme a Senha
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:text-green-600"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="px-6 py-2 text-red-500 border-2 border-red-500 uppercase hover:bg-red-500 hover:text-white transition-colors font-semibold"
              >
                Excluir Conta
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white uppercase hover:bg-green-700 transition-colors font-semibold"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilProfessor;