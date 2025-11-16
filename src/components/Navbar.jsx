export default function Navbar({ reports, selected, onSelect, onHistoryToggle, historyOpen }) {
    return (
        <nav className="w-full bg-gradient-to-r from-[#0398B0] to-[#41B983] text-white px-6 py-3 flex justify-between items-center shadow-lg mb-6">

            <div className="flex gap-4 font-semibold">
                <button
                    onClick={() => onSelect(reports[0])}
                    className={`px-4 py-2 rounded-xl transition ${
                        selected?.name === "Atendimentos"
                            ? "bg-white text-[#0398B0]"
                            : "hover:bg-white/20"
                    }`}
                >
                    Atendimentos
                </button>

                <button
                    onClick={() => onSelect(reports[1])}
                    className={`px-4 py-2 rounded-xl transition ${
                        selected?.name === "Profissionais Ativos"
                            ? "bg-white text-[#0398B0]"
                            : "hover:bg-white/20"
                    }`}
                >
                    Profissionais
                </button>

                <button className="px-4 py-2 rounded-xl opacity-60 cursor-not-allowed">
                    Produção
                </button>

                <span className="px-4 py-2 rounded-xl bg-white/10">
                    EM BREVE
                </span>
            </div>

            <button
                onClick={onHistoryToggle}
                className={`font-bold flex items-center gap-2 ${
                    historyOpen ? "text-yellow-300" : "hover:text-yellow-200"
                }`}
            >
                <i className="fa-solid fa-clock-rotate-left"></i>
                Histórico
            </button>

        </nav>
    );
}
