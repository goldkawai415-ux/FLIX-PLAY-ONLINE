import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, User } from 'lucide-react';

const LoginAdmin: React.FC = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validação solicitada no prompt
    if (usuario === 'alexandre' && senha === 'belezada1') {
      // Cria um token simples combinando as credenciais para passar na URL (simulação de sessão)
      const token = `${usuario}:${senha}`;
      navigate(`/admin/painel?token=${encodeURIComponent(token)}`);
    } else {
      setErro('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700/50 ring-1 ring-white/5">
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-red-600 to-red-900 p-4 rounded-full shadow-lg shadow-red-900/50 border border-red-500/30">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-extrabold text-white mb-2 tracking-tight">Painel Administrativo</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Entre com suas credenciais de superusuário.</p>
        
        {erro && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                {erro}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Usuário
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="block w-full pl-10 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Digite seu usuário"
                  required
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Senha
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full pl-10 bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="••••••••••••"
                  required
                />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-red-900/40 mt-2"
          >
            Acessar Sistema
          </button>
        </form>
        
        <div className="mt-8 text-center pt-6 border-t border-gray-700/30">
            <a href="/" className="text-sm text-gray-500 hover:text-white hover:underline transition-colors">
                &larr; Voltar para o Site
            </a>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;