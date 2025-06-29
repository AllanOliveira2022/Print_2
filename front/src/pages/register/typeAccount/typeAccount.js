import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function TypeAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg relative">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold text-green-700">SIGEF</h1>
        </div>
        <div className="text-left mt-2">
          <h2 className="text-2xl font-semibold text-black-800">Selecione um perfil</h2>
          <p className="mt-1 text-sm text-gray-500">
            Selecione seu tipo de perfil para criar uma conta no SIGEF
          </p>
        </div>

        <div className="space-y-4 text-green-600">
          <Link
            to="/Login/Admin"
            className="w-full gap-2 p-4 flex flex-row items-center border border-green-600 rounded-lg hover:text-white hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Administrador/Técnico</span>
            <FaArrowRightLong />
          </Link>

          <Link
            to="/Login/Professor"
            className="w-full gap-2 p-4 flex flex-row items-center border border-green-600 rounded-lg hover:text-white hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Professor</span>
            <FaArrowRightLong />
          </Link>
          <Link
            to="/visitante"
            className="w-full gap-2 p-4 flex flex-row items-center border border-green-600 rounded-lg hover:text-white hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-lg font-medium">Visitante</span>
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TypeAccount;
