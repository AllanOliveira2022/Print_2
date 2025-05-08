function MenuSection({ icon, sectionName, isActive = false }) {
    return (
        <div className={`
            flex items-center p-3 rounded-xl cursor-pointer transition-colors
            ${isActive 
                ? "bg-green-600 text-white font-bold" 
                : "text-gray-700 hover:bg-green-200"}
        `}>
            <span className="mr-3 text-lg">{icon}</span>
            <p>{sectionName}</p>
        </div>
    );
}

export default MenuSection;