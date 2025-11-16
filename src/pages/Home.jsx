import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ReportCard from "../components/ReportCard";
import FiltersPanel from "../components/FiltersPanel";
import { getFilters, downloadExcel } from "../services/api";

export default function Home() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [filtros, setFiltros] = useState({});
    const [selectedFiltros, setSelectedFiltros] = useState({});
    const [historyOpen, setHistoryOpen] = useState(false);

    const reports = [
        {
            name: "Atendimentos",
            icon: "fa-user-check",
            endpoint: "atendimentos",
            description: [
                "Relatório completo de atendimentos",
                "Inclui tipo, turno, profissional",
            ],
        },
        {
            name: "Profissionais Ativos",
            icon: "fa-users",
            endpoint: "profissionais-ativos",
            description: [
                "Lista profissionais ativos",
                "Filtrado por Distrito, Unidade, Equipe",
            ],
        },
    ];

    const fetchFiltros = async (report) => {
        try {
            const data = await getFilters(report);
            setFiltros(data);
        } catch (e) {
            console.error("Erro ao carregar filtros", e);
        }
    };

    const handleSelect = async (report) => {
        setSelectedReport(report);
        await fetchFiltros(report.endpoint);
        setSelectedFiltros({});
    };

    const handleFilterChange = (nome, valor) => {
        setSelectedFiltros((prev) => ({ ...prev, [nome]: valor }));
    };

    const readyToDownload =
        selectedFiltros.distritos && selectedFiltros.unidades;

    const gerarExcel = async () => {
        if (!readyToDownload) return;
        try {
            const blob = await downloadExcel(
                selectedReport.endpoint,
                selectedFiltros
            );

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${selectedReport.endpoint}.xlsx`;
            a.click();
        } catch {
            alert("Erro ao gerar Excel");
        }
    };

    const gerarPDF = () => {
        alert("PDF ainda não implementado no backend");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Navbar
                reports={reports}
                selected={selectedReport}
                onSelect={handleSelect}
                onHistoryToggle={() => setHistoryOpen(!historyOpen)}
                historyOpen={historyOpen}
            />

            <Header />

            <div className="w-full max-w-5xl px-6 pb-16">

                {/* LISTA DE RELATÓRIOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {reports.map((r) => (
                        <ReportCard
                            key={r.name}
                            icon={r.icon}
                            title={r.name}
                            description={r.description}
                            isSelected={selectedReport?.name === r.name}
                            onClick={() => handleSelect(r)}
                        />
                    ))}
                </div>

                {/* FILTROS */}
                {selectedReport && (
                    <FiltersPanel
                        filtros={filtros}
                        onChange={handleFilterChange}
                    />
                )}

                {/* CARDS EXCEL / PDF */}
                {selectedReport && (
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">

                        {/* EXCEL */}
                        <button
                            onClick={gerarExcel}
                            disabled={!readyToDownload}
                            className={`bg-white p-6 rounded-2xl border shadow flex items-center gap-4 transition ${
                                readyToDownload
                                    ? "hover:shadow-xl"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            <i className="fa-solid fa-file-excel text-4xl text-[#0398B0]"></i>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Exportar Excel
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Gerar arquivo .xlsx
                                </p>
                            </div>
                        </button>

                        {/* PDF */}
                        <button
                            onClick={gerarPDF}
                            disabled={!readyToDownload}
                            className={`bg-white p-6 rounded-2xl border shadow flex items-center gap-4 transition ${
                                readyToDownload
                                    ? "hover:shadow-xl"
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            <i className="fa-solid fa-file-pdf text-4xl text-[#41B983]"></i>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Exportar PDF
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Gerar arquivo .pdf
                                </p>
                            </div>
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
}
