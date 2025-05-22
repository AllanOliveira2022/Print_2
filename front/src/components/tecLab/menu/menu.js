import { useState } from "react";
import { useLocation } from "react-router-dom";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { GrCubes } from "react-icons/gr";
import { FaRegListAlt, FaUserGraduate, FaRegBell, FaClipboardCheck } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MenuSection from "../menuSection/menuSection";

function Menu({ userName, userCode }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            {/* Botão de abrir menu - visível apenas em mobile */}
            <button
                className="fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md sm:hidden"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <HiOutlineMenuAlt3 size={30} />
            </button>

            {/* Menu lateral */}
            <div
                className={`
                    fixed top-0 left-0 h-full bg-gray-50 border-r border-gray-300
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
                        {userName || "Nome do Admin"}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {userCode || "123456789"}
                    </p>
                </div>

                {/* Itens do menu */}
                <div className="flex flex-col space-y-2 flex-grow min-w-[280px]">
                    <MenuSection
                        icon={<HiMiniComputerDesktop />}
                        sectionName="Laboratórios"
                        redirectPath="/admin/laboratorios"
                        isActive={currentPath === "/admin/laboratorios"}
                    />
                    <MenuSection
                        icon={<FaRegListAlt />}
                        sectionName="Reservas"
                        redirectPath="/admin/reservas"
                        isActive={currentPath === "/admin/reservas"}
                    />
                    <MenuSection
                        icon={<FaClipboardCheck />}
                        sectionName="Solicitações"
                        redirectPath="/admin/solicitacoes"
                        isActive={currentPath === "/admin/solicitacoes"}
                    />
                    <MenuSection
                        icon={<GrCubes />}
                        sectionName="Materiais"
                        redirectPath="/admin/materiais"
                        isActive={currentPath === "/admin/materiais"}
                    />
                    <MenuSection
                        icon={<FaUserGraduate />}
                        sectionName="Professores"
                        redirectPath="/admin/professores"
                        isActive={currentPath === "/admin/professores"}
                    />
                    <MenuSection
                        icon={<PiStudentFill />}
                        sectionName="Estudantes"
                        redirectPath="/admin/estudantes"
                        isActive={currentPath === "/admin/estudantes"}
                    />
                    <MenuSection
                        icon={<FaRegBell />}
                        sectionName="Notificações"
                        redirectPath="/admin/notificacoes"
                        isActive={currentPath === "/admin/notificacoes"}
                    />
                </div>

                <div className="mt-6 pt-4 border-t border-gray-300 min-w-[280px]">
                    <MenuSection
                        icon={<LuArrowLeftFromLine />}
                        sectionName="Sair"
                        isActive={false}
                        customClass="hover:bg-red-500 text-red-500 hover:text-white"
                        redirectPath="/"
                    />
                </div>
            </div>

            {/* Espaço reservado para o menu (para evitar sobreposição) */}
            <div className="hidden sm:block sm:w-80 flex-shrink-0"></div>
        </>
    );
}

export default Menu;
