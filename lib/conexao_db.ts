import { Pool } from '@neondatabase/serverless';

// URL fornecida nos requisitos para conexão direta e segura.
const DATABASE_URL = "postgresql://neondb_owner:npg_D8K3GlhevBVU@ep-hidden-moon-adg2v80h-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

let poolInstance: Pool | null = null;

export const obterConexao = (): Pool => {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: DATABASE_URL,
      max: 1, // Mantém 1 conexão ativa para evitar exaustão no serverless
      idleTimeoutMillis: 1000, 
      connectionTimeoutMillis: 10000, // Timeout de 10s para conexão inicial
    });
  }
  return poolInstance;
};