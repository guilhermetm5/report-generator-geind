FILTER_QUERIES = {
    "atendimentos": {
        "distritos": """
            SELECT DISTINCT a.co_disa AS distrito
            FROM tab_monit_atend_prof_niv_sup a
            WHERE a.co_disa IS NOT NULL
            ORDER BY distrito
        """,
        "unidades": """
            SELECT DISTINCT u.no_unidade_saude AS unidade
            FROM tab_monit_atend_prof_niv_sup a
            JOIN tab_dim_unidade_saude u 
                ON a.co_dim_unidade_saude = u.co_seq_dim_unidade_saude
            WHERE u.no_unidade_saude IS NOT NULL
            ORDER BY unidade
        """,
        "equipes": """
            SELECT DISTINCT e.no_equipe AS equipe
            FROM tab_monit_atend_prof_niv_sup a
            JOIN tab_dim_equipe e 
                ON a.co_dim_equipe = e.co_seq_dim_equipe
            WHERE e.no_equipe IS NOT NULL
            ORDER BY equipe
        """
    },

    "profissionais": {
        "unidades": """
            SELECT DISTINCT "EAS" AS unidade
            FROM tab_cnes_profissionais
            WHERE "EAS" IS NOT NULL
            ORDER BY unidade
        """,
        "cargos": """
            SELECT DISTINCT "DESCRICAO" AS cargo
            FROM tab_cnes_profissionais
            WHERE "DESCRICAO" IS NOT NULL
            ORDER BY cargo
        """
    }
}
