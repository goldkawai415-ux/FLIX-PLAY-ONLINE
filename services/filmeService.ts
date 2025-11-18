import { obterConexao } from '../lib/conexao_db';
import { InterfaceFilme, RespostaApi } from '../types';

// Token gerado pela combinação usuario:senha (alexandre:belezada1)
const TOKEN_VALIDO = "alexandre:belezada1";

export const buscarFilmes = async (): Promise<RespostaApi<InterfaceFilme[]>> => {
  try {
    const pool = obterConexao();
    // Garante que a tabela existe para não quebrar a home se for o primeiro acesso
    await pool.query(`
        CREATE TABLE IF NOT EXISTS filmes (
            id SERIAL PRIMARY KEY,
            titulo TEXT NOT NULL,
            sinopse TEXT,
            capa_url TEXT,
            url_stream TEXT
        )
    `);
    
    const resultado = await pool.query('SELECT * FROM filmes ORDER BY id DESC');
    return { dados: resultado.rows as InterfaceFilme[] };
  } catch (erro: any) {
    console.error("Erro crítico ao buscar filmes:", erro);
    return { 
        erro: "ERRO CRÍTICO: Falha ao conectar. Verifique a variável DATABASE_URL na Vercel." 
    };
  }
};

export const criarFilme = async (filme: Omit<InterfaceFilme, 'id'>, token: string): Promise<RespostaApi<boolean>> => {
    if (token !== TOKEN_VALIDO) {
        return { erro: "Acesso negado: Credenciais inválidas." };
    }

    try {
        const pool = obterConexao();
        await pool.query(
            'INSERT INTO filmes (titulo, sinopse, capa_url, url_stream) VALUES ($1, $2, $3, $4)',
            [filme.titulo, filme.sinopse, filme.capa_url, filme.url_stream]
        );
        return { dados: true };
    } catch (erro: any) {
        console.error("Erro ao criar filme:", erro);
        return { erro: "Falha ao salvar no banco de dados: " + erro.message };
    }
}