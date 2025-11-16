const API_BASE = "http://192.168.0.19:8000/api";

export async function getFilters(report) {
    const res = await fetch(`${API_BASE}/filtros?relatorio=${report}`);
    return await res.json();
}

export async function downloadExcel(report, filtros) {
    const qs = new URLSearchParams(filtros).toString();

    const response = await fetch(
        `${API_BASE}/download_excel?relatorio=${report}&${qs}`
    );

    // Blob = arquivo binário (Excel)
    const blob = await response.blob();
    return blob;
}
