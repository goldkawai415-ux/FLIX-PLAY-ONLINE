import React from 'react';
import { Link } from 'react-router-dom'; // Usando react-router-dom para SPA

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-red-600 tracking-tighter hover:text-red-500 transition flex items-center gap-1">
              FLIX PLAY <span className="text-white text-sm font-normal bg-red-900/30 px-2 py-0.5 rounded border border-red-500/30">ONLINE</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link to="/" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Início
                </Link>
                <Link to="/#canais" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Canais TV
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Link to="/admin/acesso" className="text-gray-400 hover:text-white text-sm font-medium">
              Área Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;