import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaRegListAlt,
  FaClipboardCheck,
  FaRegBell,
} from "react-icons/fa";
import {
  LuArrowLeftFromLine,
  LuCircleUserRound,
} from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MenuSection from "../../menuSection/menuSection";

function MenuProfessor() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Recupera o usuário logado do localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.nome || "Nome do Professor";
  const userCode = user?.codigo_institucional || "123456789";
  return (
    
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md sm:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <HiOutlineMenuAlt3 size={30} />
      </button>

      {/* Menu lateral */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-300
          z-40 px-6 py-10 pt-20 flex flex-col
          transition-all duration-300 ease-in-out
          overflow-hidden
          sm:translate-x-0 sm:w-80
          ${isOpen ? "translate-x-0 w-80" : "-translate-x-full w-0"}
        `}
      >
        {/* Cabeçalho */}
        <div className="mb-10 min-w-[280px]">
          <h1 className="text-2xl font-bold text-green-800 mb-3">SIGEF</h1>
          <h2 className="text-sm font-semibold text-gray-700 uppercase">
            {userName}
          </h2>
          <p className="text-xs text-gray-500">{userCode}</p>
        </div>

        {/* Itens do menu */}
        <div className="flex flex-col space-y-2 flex-grow min-w-[280px]">
          <MenuSection
            icon={<FaChalkboardTeacher />}
            sectionName="Espaços"
            redirectPath="/professor/espacos"
            isActive={currentPath === "/professor/espacos"}
          />
          <MenuSection
            icon={<FaRegListAlt />}
            sectionName="Reservas"
            redirectPath="/professor/reservas"
            isActive={currentPath === "/professor/reservas"}
          />
          <MenuSection
            icon={<FaRegBell />}
            sectionName="Notificações"
            redirectPath="/professor/notificacoes"
            isActive={currentPath === "/professor/notificacoes"}
          />
        </div>

        <div className="mt-6 pt-4 min-w-[280px]">
          <MenuSection
            icon={<LuCircleUserRound />}
            sectionName="Perfil"
            redirectPath="/professor/perfil"
            isActive={currentPath === "/professor/perfil"}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 min-w-[280px]">
          <MenuSection
            icon={<LuArrowLeftFromLine />}
            sectionName="Sair"
            redirectPath="/"
            isActive={false}
            customClass="hover:bg-red-500 text-red-500 hover:text-white"
          />
        </div>
      </div>

      {/* Espaço reservado para o menu (para evitar sobreposição) */}
      <div className="hidden sm:block sm:w-80 flex-shrink-0"></div>
    </>
  );
}

export default MenuProfessor;
