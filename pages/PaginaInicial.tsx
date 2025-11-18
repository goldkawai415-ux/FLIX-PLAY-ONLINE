import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListaFilmes from '../components/ListaFilmes';
import ListaCanais from '../components/ListaCanais';
import { buscarFilmes } from '../services/filmeService';
import { buscarCanais } from '../services/canalService';
import { InterfaceFilme, InterfaceCanal } from '../types';
import { AlertTriangle, WifiOff, Heart } from 'lucide-react';

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
    } catch (e) {
      setErro("ERRO CRÍTICO: Falha inesperada na aplicação.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-red-500 selection:text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
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
                <p className="text-red-200 font-mono text-base">
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
          <div className="space-y-16">
             {/* Seção de Canais TV */}
            <section id="canais">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Canais Ao Vivo</h2>
              </div>
              <ListaCanais canais={canais} />
            </section>

            {/* Seção de Filmes */}
            <section id="filmes">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Filmes Recentes</h2>
              </div>
              <ListaFilmes filmes={filmes} />
            </section>
          </div>
        )}
      </main>
      
      <footer className="mt-20 border-t border-gray-800 bg-gray-950 py-12 text-center">
        <div className="mb-6 flex justify-center">
            <div className="bg-red-600/10 p-3 rounded-full">
                <Heart className="text-red-600 animate-pulse" size={24} />
            </div>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">
            Mergulhe no universo do entretenimento sem limites.
        </h3>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Trazemos o cinema e a TV diretamente para sua tela, com a qualidade que você merece. 
            Prepare a pipoca e deixe a magia acontecer.
        </p>
        <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
            &copy; 2024 Flix Play-Online. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default PaginaInicial;