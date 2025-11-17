from queries.report_queries import REPORTS
from services.db_service import run_query  # ⚠️ ver nota abaixo
from utils.excel_builder import build_excel_response
from utils.pdf_builder import build_pdf_response
from queries.filter_queries import FILTER_QUERIES


async def get_report_data(relatorio: str):
    """
    Retorna APENAS as opções de filtros para o relatório informado,
    usando as queries específicas de FILTER_QUERIES.
    """
    if relatorio not in FILTER_QUERIES:
        return {}

    filtros_def = FILTER_QUERIES[relatorio]
    filtros = {}

    for nome_filtro, query in filtros_def.items():
        resultados = run_query(query)
        # assume-se que cada linha tem só 1 coluna
        valores = [list(row.values())[0] for row in resultados if list(row.values())[0] is not None]
        filtros[nome_filtro] = sorted(set(valores))

    return filtros


async def get_report_excel(relatorio: str, distrito: str = None, unidade: str = None, equipe: str = None):
    if relatorio not in REPORTS:
        return {"erro": "Relatório inválido"}

    query = REPORTS[relatorio]
    params = []
    where_clauses = []

    if relatorio == "atendimentos":
        if distrito:
            where_clauses.append("a.co_disa = %s")
            params.append(distrito)
        if unidade:
            where_clauses.append("u.no_unidade_saude = %s")
            params.append(unidade)
        if equipe:
            where_clauses.append("e.no_equipe = %s")
            params.append(equipe)

    elif relatorio == "profissionais":
        if distrito:
            where_clauses.append('"DISTRITO" = %s')
            params.append(distrito)
        if unidade:
            where_clauses.append('"EAS" = %s')
            params.append(unidade)
        if equipe:
            where_clauses.append('"EQUIPE" = %s')
            params.append(equipe)

    if where_clauses:
        if "WHERE 1=1" in query:
            query = query.replace("WHERE 1=1", "WHERE 1=1 AND " + " AND ".join(where_clauses))
        else:
            query += " WHERE " + " AND ".join(where_clauses)

    data = run_query(query, params)
    if not data:
        return {"erro": "Nenhum dado encontrado"}

    return build_excel_response(data, f"relatorio_{relatorio}.xlsx")


async def get_report_pdf(relatorio: str, distrito: str = None, unidade: str = None, equipe: str = None):
    if relatorio not in REPORTS:
        return {"erro": "Relatório inválido"}

    query = REPORTS[relatorio]
    params = []
    where_clauses = []

    if relatorio == "atendimentos":
        if distrito:
            where_clauses.append("a.co_disa = %s")
            params.append(distrito)
        if unidade:
            where_clauses.append("u.no_unidade_saude = %s")
            params.append(unidade)
        if equipe:
            where_clauses.append("e.no_equipe = %s")
            params.append(equipe)

    elif relatorio == "profissionais":
        if distrito:
            where_clauses.append('"DISTRITO" = %s')
            params.append(distrito)
        if unidade:
            where_clauses.append('"EAS" = %s')
            params.append(unidade)
        if equipe:
            where_clauses.append('"EQUIPE" = %s')
            params.append(equipe)

    if where_clauses:
        if "WHERE 1=1" in query:
            query = query.replace("WHERE 1=1", "WHERE 1=1 AND " + " AND ".join(where_clauses))
        else:
            query += " WHERE " + " AND ".join(where_clauses)

    data = run_query(query, params)
    if not data:
        return {"erro": "Nenhum dado encontrado"}

    return build_pdf_response(data, f"relatorio_{relatorio}.pdf")
