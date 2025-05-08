import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function TypeAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg relative">
        {/* SIGEF no canto superior esquerdo da caixa */}
        <h1 className="text-3xl font-bold text-black">SIGEF</h1>

        <div className="text-left mt-2">
          <h2 className="text-2xl font-semibold text-gray-800">Selecione um perfil</h2>
          <p className="mt-1 text-sm text-gray-500">
            Selecione seu tipo de perfil para criar uma conta no SIGEF
          </p>
        </div>

        <div className="space-y-4 text-green-700">
          <Link
            to="/register/tecnico"
            className="w-full gap-2 p-4 flex flex-row items-center border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Técnico de Laboratório</span>
            <FaArrowRightLong />
          </Link>

          <Link
            to="/register/professor"
            className="w-full gap-2 p-4 flex flex-row items-center border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Professor</span>
            <FaArrowRightLong />
          </Link>

          <Link
            to="/register/estudante"
            className="w-full gap-2 p-4 flex flex-row items-center border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Estudante</span>
            <FaArrowRightLong />
          </Link>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="block w-full text-center text-sm font-medium text-green-600 hover:text-white bg-white hover:bg-green-600 focus:outline-none uppercase border border-green-600 hover:border-green-600 rounded-md px-4 py-2 transition-colors duration-200"
          >
            Já tenho uma conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TypeAccount;
