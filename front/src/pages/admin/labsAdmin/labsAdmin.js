import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Menu from "../../../components/tecLab/menu/menu";

function MenuLabs() {
    const navigate = useNavigate(); // hook para navegação

    const handleCadastro = () => {
        navigate("/admin/laboratorios/cadastrar"); // rota correta
    };

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <Menu />
            <div className="flex justify-center w-full p-4 md:p-8">
                <div className="w-full max-w-7xl bg-gray-50 rounded-lg shadow-md p-6 mt-4">
                    <div className="flex flex-col mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-700">
                            Laboratórios Cadastrados
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 w-full justify-between items-center">
                        {/* Campo de busca */}
                        <div className="w-full sm:w-1/2 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar laboratório"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 focus:text-black-700 rounded-lg"
                            />
                        </div>

                        {/* Botões */}
                        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end items-center gap-6 font-bold mt-6 sm:mt-0">
                            <button className="w-full sm:w-auto px-6 py-3 text-green-600 border-2 border-green-600 uppercase hover:bg-green-700 hover:text-white hover:border-green-700 rounded-lg transition-colors">
                                Filtrar
                            </button>
                            <button
                                onClick={handleCadastro}
                                className="w-full sm:w-auto px-6 py-3 bg-green-600 border-2 border-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-colors uppercase rounded-lg"
                            >
                                Cadastrar Laboratório
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuLabs;
