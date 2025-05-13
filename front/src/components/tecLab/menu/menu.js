import { useState } from "react";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { GrCubes } from "react-icons/gr";
import { FaChalkboardTeacher, FaRegBell } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MenuSection from "../menuSection/menuSection";

function Menu({ userName, userCode, activeSection = "Dashboard" }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <HiOutlineMenuAlt3 size={30} />
            </button>

            <div
                className={`
                    fixed top-0 left-0 h-full bg-gray-100 border-r border-gray-300
                    transition-transform duration-300 ease-in-out z-40
                    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    md:translate-x-0 md:w-72
                    w-72 px-5 py-10 pt-20    
                    flex flex-col
                `}
                onMouseEnter={() => !isOpen && setIsOpen(true)}
                onMouseLeave={() => window.innerWidth < 768 && setIsOpen(false)}
            >
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-green-800 mb-3">SIGEF</h1>
                    <h2 className="text-sm font-semibold text-gray-700 uppercase">
                        {userName || "Nome do Admin"}
                    </h2>
                    <p className="text-xs text-gray-500">
                        {userCode || "123456789"}
                    </p>
                </div>

                <div className="flex flex-col space-y-5 flex-grow">
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

                <div className="mt-6 pt-4 border-t border-gray-300">
                    <MenuSection
                        icon={<LuArrowLeftFromLine />}
                        sectionName="Sair"
                        isActive={false}
                    />
                </div>
            </div>
        </>
    );
}

export default Menu;