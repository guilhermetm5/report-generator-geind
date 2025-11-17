from fastapi import APIRouter, Query
from services.report_service import get_report_data, get_report_excel, get_report_pdf

router = APIRouter()

@router.get("/filtros")
async def filtros(relatorio: str = Query(...)):
    return await get_report_data(relatorio)

@router.get("/download")
async def download(relatorio: str = Query(...), distrito: str = None, unidade: str = None, equipe: str = None):
    return await get_report_excel(relatorio, distrito, unidade, equipe)

@router.get("/download_pdf")
async def download_pdf(relatorio: str = Query(...), distrito: str = None, unidade: str = None, equipe: str = None):
    return await get_report_pdf(relatorio, distrito, unidade, equipe)
