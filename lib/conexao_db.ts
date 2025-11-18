import { Pool, neonConfig } from '@neondatabase/serverless';

// --- CONFIGURAÇÃO CRÍTICA PARA NAVEGADOR ---
// Habilita o uso de WebSockets, necessário para conectar ao Postgres
// diretamente de um navegador (Client-Side), evitando erros de protocolo.
neonConfig.fetchConnectionCache = true;

// URL fornecida nos requisitos para conexão direta e segura.
const DATABASE_URL = "postgresql://neondb_owner:npg_D8K3GlhevBVU@ep-hidden-moon-adg2v80h-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let poolInstance: Pool | null = null;

export const obterConexao = (): Pool => {
  if (!poolInstance) {
    try {
        poolInstance = new Pool({
          connectionString: DATABASE_URL,
          max: 1, // Mantém 1 conexão ativa para evitar exaustão
          idleTimeoutMillis: 1000, 
          connectionTimeoutMillis: 15000, // Aumentado para 15s para redes móveis
        });
    } catch (e) {
        console.error("Falha ao inicializar o Pool de conexão:", e);
        throw e;
    }
  }
  return poolInstance;
};