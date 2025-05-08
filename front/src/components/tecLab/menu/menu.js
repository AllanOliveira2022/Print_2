import { HiMiniComputerDesktop } from "react-icons/hi2";
import { GrCubes } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { LuArrowLeftFromLine } from "react-icons/lu";
import MenuSection from "../menuSection/menuSection";

function Menu({ userName, userCode, activeSection = "Dashboard" }) {
    return (
        <div className="flex flex-col h-screen bg-gray-100 w-80 px-5 py-10 border-r border-gray-300 fixed left-0">
            {/* Cabeçalho */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-green-800 mb-10">SIGEF</h1>
                <h2 className="text-md font-semibold text-gray-700 uppercase">
                    {userName || "Nome do Admin"}
                </h2>
                <p className="text-sm text-gray-500">
                    {userCode || "123456789"}
                </p>
            </div>

            {/* Seções do Menu */}
            <div className="flex flex-col gap-2 flex-grow">
                <MenuSection 
                    icon={<HiMiniComputerDesktop />} 
                    sectionName="Laboratórios" 
                    isActive={activeSection === "Dashboard"}
                />
                <MenuSection 
                    icon={<GrCubes />} 
                    sectionName="Cursos" 
                    isActive={activeSection === "Cursos"}
                />
                <MenuSection 
                    icon={<FaChalkboardTeacher />} 
                    sectionName="Professores" 
                    isActive={activeSection === "Professores"}
                />
                <MenuSection 
                    icon={<PiStudentFill />} 
                    sectionName="Alunos" 
                    isActive={activeSection === "Alunos"}
                />
                <MenuSection 
                    icon={<FaRegBell />} 
                    sectionName="Notificações" 
                    isActive={activeSection === "Notificações"}
                />
            </div>

            {/* Rodapé */}
            <div className="mt-auto py-4 border-t border-gray-300">
                <MenuSection 
                    icon={<LuArrowLeftFromLine />} 
                    sectionName="Sair" 
                    isActive={false}
                />
            </div>
        </div>
    );
}

export default Menu;