import psycopg2
import os

def run_query(query, params=None):
    conn_params = {
        "host": os.environ.get("POSTGRES_HOST", "192.168.0.101"),
        "database": os.environ.get("POSTGRES_DB", "meubanco"),
        "user": os.environ.get("POSTGRES_USER", "postgres"),
        "password": os.environ.get("POSTGRES_PASSWORD", "admin"),
        "port": os.environ.get("POSTGRES_PORT", 5432),
    }
    with psycopg2.connect(**conn_params) as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            return [dict(zip(columns, row)) for row in rows]
