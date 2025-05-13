import { FaSearch } from "react-icons/fa";
import Menu from "../../../components/tecLab/menu/menu";

function MenuLabs() {
    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen">
            <Menu />
            <div className="flex justify-center w-full md:ml-[20%] p-[4%]">
                <div className="w-full max-w-[90%] bg-gray-50 rounded-lg shadow-md p-[4%]">
                    <div className="flex flex-col mb-[5%] gap-[2%]">
                        <h1 className="text-2xl font-bold text-gray-700">
                            Laboratórios Cadastrados
                        </h1>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-[3%] w-full justify-between items-center">
                        {/* Campo de busca */}
                        <div className="w-full sm:w-[40%] relative">
                            <div className="absolute inset-y-0 left-0 pl-[4%] flex items-center pointer-events-none">
                                <FaSearch className="h-4 w-4 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Buscar laboratório"
                                className="w-full pl-[12%] pr-[4%] py-[3%] border border-gray-300 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:text-green-600 rounded-lg"
                            />
                        </div>

                        {/* Botões */}
                        <div className="w-full sm:w-[55%] flex flex-col sm:flex-row justify-end items-center gap-[3%] font-bold mt-[4%] sm:mt-0">
                            <button className="w-full sm:w-auto px-[5%] py-[2.5%] text-green-600 border-2 border-green-600 uppercase hover:bg-green-600 hover:text-white rounded-lg transition-colors">
                                Filtrar
                            </button>
                            <button className="w-full sm:w-auto px-[5%] py-[2.5%] bg-green-600 text-white hover:bg-green-700 transition-colors uppercase rounded-lg">
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
