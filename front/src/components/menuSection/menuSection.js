import { useNavigate } from "react-router-dom";

function MenuSection({ icon, sectionName, isActive, customClass = "", redirectPath }) {
    const navigate = useNavigate();

    const handleClick = () => {
        const route = redirectPath || `/${sectionName.toLowerCase().replace(" ", "")}`;
        navigate(route);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                flex items-center gap-4 py-3 px-4 rounded-lg transition-all
                w-full text-left font-medium text-base
            ${customClass || (isActive
                ? "bg-green-600 text-white"
                : "text-green-600 hover:bg-green-100")}
            `}
            >
            <span className="text-lg">{icon}</span>
            <span>{sectionName}</span>
            </button>
    );
}

export default MenuSection;