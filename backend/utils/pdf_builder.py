from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from fastapi.responses import StreamingResponse

def build_pdf_response(data, filename="relatorio.pdf"):
    """
    Gera PDF simples com base nos dados.
    Data deve ser uma lista de dicionários.
    """

    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4

    y = height - 50
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, y, "Relatório Gerado")
    y -= 30

    p.setFont("Helvetica", 10)

    if not data:
        p.drawString(50, y, "Nenhum dado encontrado.")
    else:
        # Cabeçalhos
        headers = list(data[0].keys())
        p.drawString(50, y, " | ".join(headers))
        y -= 20

        # Linhas
        for row in data:
            linha = " | ".join(str(row[h]) for h in headers)
            p.drawString(50, y, linha)
            y -= 15

            if y < 50:  # salto de página
                p.showPage()
                p.setFont("Helvetica", 10)
                y = height - 50

    p.save()
    buffer.seek(0)

    headers = {
        "Content-Disposition": f"attachment; filename={filename}"
    }

    return StreamingResponse(buffer, media_type="application/pdf", headers=headers)
