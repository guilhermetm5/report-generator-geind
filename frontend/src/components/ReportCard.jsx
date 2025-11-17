export default function ReportCard({ icon, title, description, onClick, isSelected }) {
    return (
        <button
            onClick={onClick}
            className={`bg-white p-6 rounded-2xl shadow border text-left flex gap-4 transition ${
                isSelected
                    ? "border-[#41B983] ring-2 ring-[#41B983]/40"
                    : "hover:shadow-xl"
            }`}
        >
            <div className="w-1/2 border-r pr-4">
                <i className={`fa-solid ${icon} text-4xl text-[#0398B0]`}></i>
                <h3 className="text-xl font-semibold mt-2">{title}</h3>
                <p className="text-gray-500 text-sm mt-1">Relatório detalhado</p>
            </div>

            <div className="w-1/2 pl-4">
                <ul className="list-disc text-gray-600">
                    {description.map((d, i) => (
                        <li key={i}>{d}</li>
                    ))}
                </ul>
            </div>
        </button>
    );
}
