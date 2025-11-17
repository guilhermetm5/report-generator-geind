const API_URL = "http://192.168.0.19:8000/api";

export async function getFilters(report) {
    const res = await fetch(`${API_URL}/filtros?relatorio=${report}`);
    return await res.json();
}

export async function downloadExcel(report, filtros) {
    const params = new URLSearchParams({ relatorio: report });

    Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    const res = await fetch(`${API_URL}/download?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Erro ao gerar Excel");
    }

    return await res.blob();
}

export async function downloadPDF(report, filtros) {
    const params = new URLSearchParams({ relatorio: report });

    Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    const res = await fetch(`${API_URL}/download_pdf?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Erro ao gerar PDF");
    }

    return await res.blob();
}
