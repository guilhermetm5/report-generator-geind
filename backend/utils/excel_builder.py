from fastapi.responses import StreamingResponse
from io import BytesIO
import pandas as pd

def build_excel_response(data, filename):
    df = pd.DataFrame(data)
    output = BytesIO()
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        df.to_excel(writer, index=False)
    output.seek(0)
    headers = {
        "Content-Disposition": f"attachment; filename={filename}"
    }
    return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers=headers)
