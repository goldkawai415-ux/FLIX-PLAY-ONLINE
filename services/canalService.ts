import { obterConexao } from '../lib/conexao_db';
import { InterfaceCanal, RespostaApi } from '../types';

const TOKEN_VALIDO = "alexandre:belezada1";

export const buscarCanais = async (): Promise<RespostaApi<InterfaceCanal[]>> => {
  try {
    const pool = obterConexao();
    // Garante a existência da tabela na leitura para evitar crash
    await pool.query(`
        CREATE TABLE IF NOT EXISTS canais (
            id SERIAL PRIMARY KEY,
            nome TEXT NOT NULL,
            logo_url TEXT,
            url_stream TEXT
        )
    `);

    const resultado = await pool.query('SELECT * FROM canais ORDER BY nome ASC');
    return { dados: resultado.rows as InterfaceCanal[] };
  } catch (erro: any) {
    console.error("Erro ao buscar canais:", erro);
    return { erro: "ERRO CRÍTICO: Falha ao conectar. Verifique a variável DATABASE_URL na Vercel." };
  }
};

export const criarCanal = async (canal: Omit<InterfaceCanal, 'id'>, token: string): Promise<RespostaApi<boolean>> => {
    if (token !== TOKEN_VALIDO) {
        return { erro: "Acesso negado: Credenciais inválidas." };
    }

    try {
        const pool = obterConexao();
        await pool.query(
            'INSERT INTO canais (nome, logo_url, url_stream) VALUES ($1, $2, $3)',
            [canal.nome, canal.logo_url, canal.url_stream]
        );
        return { dados: true };
    } catch (erro: any) {
        console.error("Erro ao criar canal:", erro);
        return { erro: "Falha ao salvar canal: " + erro.message };
    }
};