import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Film, Tv, LogOut, ExternalLink } from 'lucide-react';
import { buscarFilmes } from '../../services/filmeService';
import { buscarCanais } from '../../services/canalService';
import { InterfaceFilme, InterfaceCanal } from '../../types';

const PainelAdmin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [filmes, setFilmes] = useState<InterfaceFilme[]>([]);
  const [canais, setCanais] = useState<InterfaceCanal[]>([]);
  const [loading, setLoading] = useState(true);

  // Validação rigorosa do token alexandre:belezada1
  useEffect(() => {
    if (token !== "alexandre:belezada1") {
      navigate('/admin/acesso');
      return;
    }
  }, [token, navigate]);

  useEffect(() => {
    const carregar = async () => {
      if (!token) return;
      const [resFilmes, resCanais] = await Promise.all([
          buscarFilmes(),
          buscarCanais()
      ]);
      if (resFilmes.dados) setFilmes(resFilmes.dados);
      if (resCanais.dados) setCanais(resCanais.dados);
      setLoading(false);
    };
    carregar();
  }, [token]);

  if (token !== "alexandre:belezada1") return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg">
             <Film className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">Painel Administrativo</span>
        </div>
        <div className="flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-700">
            <div className="flex items-center gap-2 border-r border-gray-700 pr-4 mr-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 font-mono">alexandre</span>
            </div>
            <Link to="/" target="_blank" className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition">
                <ExternalLink size={14} /> Site
            </Link>
            <button onClick={() => navigate('/admin/acesso')} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm ml-2 font-bold">
                <LogOut size={14} /> Sair
            </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        
        {/* Seção Filmes */}
        <div>
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-200">
                <Film className="text-red-500" /> Gerenciar Filmes
            </h2>
            <Link 
                to={`/admin/filmes/novo?token=${token}`}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-lg shadow-red-900/20 font-medium"
            >
                <Plus size={18} /> Adicionar Filme
            </Link>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            {loading ? (
                <div className="p-8 text-center text-gray-400 animate-pulse">Carregando filmes...</div>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-750 text-gray-400 uppercase text-xs font-bold bg-gray-900/30">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Capa</th>
                        <th className="px-6 py-4">Título</th>
                        <th className="px-6 py-4">Stream URL</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                    {filmes.length > 0 ? (
                        filmes.map((filme) => (
                        <tr key={filme.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-gray-500 font-mono text-sm">#{filme.id}</td>
                            <td className="px-6 py-4">
                                <div className="h-12 w-8 bg-gray-700 rounded overflow-hidden">
                                    <img src={filme.capa_url} alt="" className="h-full w-full object-cover" />
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-white">{filme.titulo}</td>
                            <td className="px-6 py-4 text-gray-500 text-xs max-w-[150px] truncate font-mono">
                            {filme.url_stream}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                            Nenhum filme cadastrado ainda.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            )}
            </div>
        </div>

        {/* Seção Canais */}
        <div>
            <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-200">
                <Tv className="text-red-500" /> Gerenciar Canais
            </h2>
            <Link 
                to={`/admin/canais/novo?token=${token}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-lg shadow-blue-900/20 font-medium"
            >
                <Plus size={18} /> Adicionar Canal
            </Link>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            {loading ? (
                <div className="p-8 text-center text-gray-400 animate-pulse">Carregando canais...</div>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-750 text-gray-400 uppercase text-xs font-bold bg-gray-900/30">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Logo</th>
                        <th className="px-6 py-4">Nome do Canal</th>
                        <th className="px-6 py-4">Stream URL</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                    {canais.length > 0 ? (
                        canais.map((canal) => (
                        <tr key={canal.id} className="hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 text-gray-500 font-mono text-sm">#{canal.id}</td>
                            <td className="px-6 py-4">
                                <div className="h-10 w-10 bg-gray-900 rounded flex items-center justify-center p-1">
                                    <img src={canal.logo_url} alt="" className="max-h-full max-w-full object-contain" />
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-white">{canal.nome}</td>
                            <td className="px-6 py-4 text-gray-500 text-xs max-w-[150px] truncate font-mono">
                            {canal.url_stream}
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">
                            Nenhum canal ao vivo cadastrado.
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default PainelAdmin;