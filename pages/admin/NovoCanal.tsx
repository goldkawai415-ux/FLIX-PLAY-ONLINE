import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Tv } from 'lucide-react';
import { criarCanal } from '../../services/canalService';

const NovoCanal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [form, setForm] = useState({
    nome: '',
    logo_url: '',
    url_stream: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{tipo: 'sucesso' | 'erro', texto: string} | null>(null);

  if (token !== "alexandre:belezada1") {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <p>Acesso Negado.</p>
        </div>
      );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const res = await criarCanal(form, token);

    if (res.erro) {
      setMsg({ tipo: 'erro', texto: res.erro });
    } else {
      setMsg({ tipo: 'sucesso', texto: 'Canal adicionado com sucesso!' });
      setForm({ nome: '', logo_url: '', url_stream: '' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-xl mx-auto mt-10">
        <div className="mb-8">
          <Link to={`/admin/painel?token=${token}`} className="text-gray-400 hover:text-white flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft size={20} /> Voltar ao Painel
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-lg">
                <Tv className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Adicionar Novo Canal</h1>
          </div>
        </div>

        {msg && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center ${msg.tipo === 'sucesso' ? 'bg-green-900/30 border-green-500/50 text-green-400' : 'bg-red-900/30 border-red-500/50 text-red-400'}`}>
            {msg.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Nome do Canal</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Globo, SBT, CNN..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Logo URL (Imagem PNG/JPG)</label>
            <input
              type="url"
              name="logo_url"
              value={form.logo_url}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">URL do Stream (M3U8)</label>
            <input
              type="url"
              name="url_stream"
              value={form.url_stream}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all transform hover:translate-y-[-2px] shadow-lg shadow-blue-900/30 mt-4"
          >
            {loading ? 'Salvando Canal...' : <><Save size={20} /> Confirmar Criação</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoCanal;