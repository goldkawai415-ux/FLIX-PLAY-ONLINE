import React from 'react';
import { InterfaceCanal } from '../types';
import { Tv } from 'lucide-react';

interface Props {
  canais: InterfaceCanal[];
}

const ListaCanais: React.FC<Props> = ({ canais }) => {
  if (canais.length === 0) {
    return (
        <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700/50 dashed">
            <Tv className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">Nenhum canal ao vivo cadastrado.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {canais.map((canal) => (
        <a 
            key={canal.id} 
            href={canal.url_stream}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/10 border border-gray-700 hover:border-red-500/30"
        >
            <div className="aspect-square w-full bg-gray-900 rounded-lg flex items-center justify-center p-4 mb-3 group-hover:bg-black transition-colors">
                {canal.logo_url ? (
                    <img src={canal.logo_url} alt={canal.nome} className="max-h-full max-w-full object-contain" />
                ) : (
                    <Tv className="w-1/2 h-1/2 text-gray-600 group-hover:text-red-500 transition-colors" />
                )}
            </div>
            <h3 className="text-center font-bold text-gray-200 group-hover:text-white truncate text-sm">
                {canal.nome}
            </h3>
            <div className="flex items-center justify-center mt-2 gap-1 text-xs font-bold text-red-500 uppercase tracking-wider">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Ao Vivo
            </div>
        </a>
      ))}
    </div>
  );
};

export default ListaCanais;