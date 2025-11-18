import React from 'react';
import { InterfaceFilme } from '../types';
import { PlayCircle } from 'lucide-react';

interface Props {
  filmes: InterfaceFilme[];
}

const ListaFilmes: React.FC<Props> = ({ filmes }) => {
  if (filmes.length === 0) {
    return (
        <div className="text-center py-32 bg-gray-800/50 rounded-2xl border border-gray-700 dashed border-2">
            <p className="text-gray-400 text-xl font-medium">Nenhum conteúdo disponível no momento.</p>
            <p className="text-gray-600 mt-2">Acesse o painel administrativo para adicionar filmes.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filmes.map((filme) => (
        <div key={filme.id} className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-red-900/20 hover:shadow-2xl ring-1 ring-white/5 hover:ring-red-500/50">
          {/* Container da Imagem com Aspect Ratio de Poster */}
          <div className="aspect-[2/3] w-full overflow-hidden bg-gray-900 relative">
            <img 
              src={filme.capa_url} 
              alt={filme.titulo} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
              onError={(e) => { 
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x600/1a1a1a/red?text=Sem+Capa';
              }}
            />
            
            {/* Overlay de Ação */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <a 
                    href={filme.url_stream} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transform hover:scale-110 transition-transform duration-200"
                >
                    <PlayCircle className="w-16 h-16 text-red-600 fill-current bg-white rounded-full border-4 border-transparent" />
                </a>
                <span className="mt-3 font-bold text-white text-sm uppercase tracking-wider">Assistir Agora</span>
            </div>
            
            {/* Gradiente Inferior para legibilidade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
          </div>

          <div className="p-4 relative z-20 bg-gray-800">
            <h3 className="text-base font-bold text-white truncate mb-1" title={filme.titulo}>
              {filme.titulo}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed h-9">
              {filme.sinopse || "Sem descrição disponível para este título."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaFilmes;
