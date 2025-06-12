import { useNavigate } from "react-router-dom";

export default function PagVisitante() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-2xl font-semibold text-green-600">Em desenvolvimento</h1>
        <div className="w-6 h-6 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
      >
        Voltar
      </button>
    </div>
  );
}
