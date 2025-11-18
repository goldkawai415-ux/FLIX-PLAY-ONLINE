import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListaFilmes from '../components/ListaFilmes';
import ListaCanais from '../components/ListaCanais';
import { buscarFilmes } from '../services/filmeService';
import { buscarCanais } from '../services/canalService';
import { InterfaceFilme, InterfaceCanal } from '../types';
import { AlertTriangle, WifiOff, Heart, Zap, Server } from 'lucide-react';

const PaginaInicial: React.FC = () => {
  const [filmes, setFilmes] = useState<InterfaceFilme[]>([]);
  const [canais, setCanais] = useState<InterfaceCanal[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = async () => {
    setLoading(true);
    setErro(null);
    
    try {
      // Busca paralela para eficiência
      const [resFilmes, resCanais] = await Promise.all([
        buscarFilmes(),
        buscarCanais()
      ]);
      
      if (resFilmes.erro) {
        setErro(resFilmes.erro);
      } else if (resCanais.erro) {
        setErro(resCanais.erro);
      } else {
        setFilmes(resFilmes.dados || []);
        setCanais(resCanais.dados || []);
      }
    } catch (e: any) {
      console.error("Erro na Home:", e);
      setErro(e.message || "ERRO CRÍTICO: Falha inesperada na aplicação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-red-500 selection:text-white flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {loading ? (
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-6"></div>
            <p className="text-gray-400 animate-pulse text-lg font-medium">Carregando conteúdo...</p>
          </div>
        ) : erro ? (
          <div className="bg-red-950/40 border border-red-600/50 rounded-2xl p-10 text-center max-w-2xl mx-auto mt-16 backdrop-blur-sm shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-red-600/20 p-5 rounded-full border border-red-500/20">
                <WifiOff className="text-red-500 w-16 h-16" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-red-500 mb-4 uppercase tracking-tight">Erro de Conexão</h2>
            <div className="bg-black/40 rounded-lg p-4 mb-8 inline-block border border-red-900/30">
                <p className="text-red-200 font-mono text-base break-words">
                {erro}
                </p>
            </div>
            <br />
            <button 
              onClick={carregarDados}
              className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
            >
              <AlertTriangle className="w-5 h-5 mr-2" /> Tentar Novamente
            </button>
          </div>
        ) : (
          <div className="space-y-16 animate-fade-in">
             {/* Seção de Canais TV */}
            <section id="canais">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-red-800 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Canais Ao Vivo</h2>
              </div>
              <ListaCanais canais={canais} />
            </section>

            {/* Seção de Filmes */}
            <section id="filmes">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-red-800 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Filmes Recentes</h2>
              </div>
              <ListaFilmes filmes={filmes} />
            </section>
          </div>
        )}
      </main>
      
      {/* Footer Moderno e Convidativo */}
      <footer className="mt-24 border-t border-gray-800 bg-[#0a0a0a] relative overflow-hidden">
        {/* Efeito de brilho superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
            {/* Logo e Ícone */}
            <div className="mb-8 flex justify-center">
                <div className="bg-gradient-to-br from-red-900/20 to-black p-4 rounded-full ring-1 ring-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                    <Heart className="text-red-600 animate-pulse fill-red-600/20" size={32} />
                </div>
            </div>

            <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Flix Play-Online
            </h3>
            
            <p className="text-gray-400 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
                Sua central definitiva de entretenimento. Experimente o futuro do streaming com performance inigualável, 
                catálogo atualizado e a melhor experiência visual da web.
            </p>

            {/* Badge Tecnológico Chamativo */}
            <div className="mb-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Arquitetura de Alta Performance</span>
                <div className="group relative inline-flex items-center gap-3 bg-gray-900/80 border border-gray-800 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-500 font-bold">
                            Neon DB Serverless
                        </span>
                    </div>
                    
                    <span className="text-gray-600 font-light text-lg">|</span>
                    
                    <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-white" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-bold">
                            Next.js Architecture
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-gray-600 text-xs font-medium flex items-center justify-center gap-2">
                <span>&copy; 2024 Flix Play-Online.</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>Todos os direitos reservados.</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PaginaInicial;