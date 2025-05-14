import { useNavigate } from "react-router-dom";

function MenuSection({ icon, sectionName, isActive, customClass = "", redirectPath }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Usando o redirectPath se for fornecido, caso contrário, utilizando uma rota padrão.
        const route = redirectPath || `/${sectionName.toLowerCase().replace(" ", "")}`;
        navigate(route);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                flex items-center gap-4 py-3 px-4 rounded-lg transition-all
                ${isActive ? "bg-green-700 text-white" : "text-green-700 hover:text-white hover:bg-green-700"}
                w-full text-left font-medium text-base
                ${customClass}
            `}
        >
            <span className="text-lg">{icon}</span>
            <span>{sectionName}</span>
        </button>
    );
}

export default MenuSection;
