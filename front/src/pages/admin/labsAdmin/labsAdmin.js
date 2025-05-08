import { FaSearch } from "react-icons/fa";
import Menu from "../../../components/tecLab/menu/menu";

function MenuLabs() {
    return (
        <div>
            <Menu/>
            <div className="flex justify-center max-h-screen p-6">
                <div className="max-w-6xl w-full bg-gray-50 rounded-lg shadow-md p-6">
                    <div className="flex flex-col mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-gray-700">
                        Laboratórios Cadastrados
                    </h1>
                    </div>
                        
                    <div className="flex flex-col sm:flex-row gap-3 w-full justify-between items-center">
                    <div className="w-full sm:w-1/3 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-4 w-4 text-gray-400" />
                        </div>
                        <input 
                        type="text" 
                        placeholder="Buscar laboratório"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:text-green-600 rounded-lg"
                        />
                    </div>
                    <div className="w-full sm:w-1/2 flex flex-row justify-end font-bold gap-5">
                        <button className="px-6 sm:px-10 py-2 text-green-600 border-2 border-green-600 uppercase hover:bg-green-600 hover:text-white rounded-lg transition-colors">
                        Filtrar
                        </button>
                        <button className="px-6 sm:px-10 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors uppercase rounded-lg">
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