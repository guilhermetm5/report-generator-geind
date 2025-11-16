export default function FiltersPanel({ filtros, onChange }) {
    if (!filtros || Object.keys(filtros).length === 0) {
        return (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-4 text-center text-sm text-gray-500">
                Selecione um relatório para carregar os filtros.
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border mb-8">
            <h2 className="text-xl font-semibold text-[#0398B0] mb-4">
                Filtros do Relatório
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(filtros).map(([nome, opcoes]) => (
                    <div key={nome} className="flex flex-col">
                        <label className="font-medium mb-1 capitalize text-gray-700">
                            {nome}
                        </label>

                        <select
                            defaultValue=""
                            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#41B983]"
                            onChange={(e) => onChange(nome, e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione...
                            </option>

                            {opcoes.map((op) => (
                                <option key={op} value={op}>
                                    {op}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}
