import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importação das páginas
import PaginaInicial from './pages/PaginaInicial';
import LoginAdmin from './pages/admin/LoginAdmin';
import PainelAdmin from './pages/admin/PainelAdmin';
import NovoFilme from './pages/admin/NovoFilme';
import NovoCanal from './pages/admin/NovoCanal';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Rota Pública: Catálogo */}
        <Route path="/" element={<PaginaInicial />} />
        
        {/* Rotas Admin */}
        <Route path="/admin/acesso" element={<LoginAdmin />} />
        <Route path="/admin/painel" element={<PainelAdmin />} />
        <Route path="/admin/filmes/novo" element={<NovoFilme />} />
        <Route path="/admin/canais/novo" element={<NovoCanal />} />
        
        {/* Fallback para qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;