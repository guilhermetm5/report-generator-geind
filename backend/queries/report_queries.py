REPORTS = {
    "atendimentos": """
        SELECT 
            a.co_disa AS distrito,
            u.no_unidade_saude AS unidade,
            e.no_equipe AS equipe,
            a.ds_local_atendimento,
            a.ds_tipo_atendimento,
            a.ds_turno,
            a.ds_tipo_ficha,
            a.dt_inicial_atendimento,
            a.dt_final_atendimento
        FROM tab_monit_atend_prof_niv_sup a
        LEFT JOIN tab_dim_unidade_saude u 
            ON a.co_dim_unidade_saude = u.co_seq_dim_unidade_saude
        LEFT JOIN tab_dim_equipe e 
            ON a.co_dim_equipe = e.co_seq_dim_equipe
        WHERE 1=1
    """,

    "profissionais": """
        SELECT 
            "DISTRITO"       AS distrito,
            "CNES"           AS cnes,
            "EAS"            AS unidade,
            "NOME_PROF"      AS nome_prof,
            "CPF_PROF"       AS cpf,
            "COD_CBO"        AS cod_cbo,
            "DESCRICAO"      AS descricao_cbo,
            "EQUIPE"         AS equipe,
            "DT_ENTRADA"     AS dt_entrada,
            "DT_DESLIGAMENTO" AS dt_desligamento
        FROM tab_cnes_profissionais
        WHERE 1=1
    """
}
