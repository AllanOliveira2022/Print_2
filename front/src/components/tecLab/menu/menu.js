import { useState } from "react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { GrCubes } from "react-icons/gr";
import { FaRegListAlt, FaUserGraduate, FaRegBell, FaClipboardCheck } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MenuSection from "../menuSection/menuSection";

function Menu({ userName, userCode, activeSection = "Dashboard" }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <>
            {/* Botão de abrir menu */}
            <button
                className="fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <HiOutlineMenuAlt3 size={30} />
            </button>

            {/* Menu lateral */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`
                    fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-300
                    transition-transform duration-300 ease-in-out z-40
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    w-80 px-6 py-10 pt-20 flex flex-col
                `}
            >
                {/* Cabeçalho */}
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-green-800 mb-3">SIGEF</h1>
                    <h2 className="text-sm font-semibold text-gray-700 uppercase">
                        {userName || "Nome do Admin"}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {userCode || "123456789"}
                    </p>
                </div>

                {/* Itens do menu */}
                <div className="flex flex-col space-y-2 flex-grow">
                    <MenuSection
                        icon={<HiMiniComputerDesktop />}
                        sectionName="Laboratórios"
                        isActive={activeSection === "Dashboard"}
                    />
                    <MenuSection
                        icon={<FaRegListAlt />}
                        sectionName="Reservas"
                        isActive={activeSection === "Reservas"}
                    />
                    <MenuSection
                        icon={<FaClipboardCheck />}
                        sectionName="Solicitações"
                        isActive={activeSection === "Solicitações"}
                    />
                    <MenuSection
                        icon={<GrCubes />}
                        sectionName="Materiais"
                        isActive={activeSection === "Materiais"}
                    />
                    <MenuSection
                        icon={<FaUserGraduate />}
                        sectionName="Professores"
                        isActive={activeSection === "Professores"}
                    />
                    <MenuSection
                        icon={<PiStudentFill />}
                        sectionName="Estudantes"
                        isActive={activeSection === "Estudantes"}
                    />
                    <MenuSection
                        icon={<FaRegBell />}
                        sectionName="Notificações"
                        isActive={activeSection === "Notificações"}
                    />
                </div>

                {/* Botão de sair com hover vermelho em box */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                    <MenuSection
                        icon={<LuArrowLeftFromLine />}
                        sectionName="Sair"
                        isActive={false}
                        customClass="hover:bg-red-700 text-red-600 hover:text-white-700"
                    />
                </div>
            </div>
        </>
    );
}

export default Menu;
