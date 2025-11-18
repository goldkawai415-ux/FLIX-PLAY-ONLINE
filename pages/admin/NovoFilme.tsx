import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { criarFilme } from '../../services/filmeService';

const NovoFilme: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [form, setForm] = useState({
    titulo: '',
    sinopse: '',
    capa_url: '',
    url_stream: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{tipo: 'sucesso' | 'erro', texto: string} | null>(null);

  if (!token) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <p>Acesso não autorizado.</p>
        </div>
      );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const res = await criarFilme(form, token);

    if (res.erro) {
      setMsg({ tipo: 'erro', texto: res.erro });
    } else {
      setMsg({ tipo: 'sucesso', texto: 'Filme adicionado com sucesso!' });
      setForm({ titulo: '', sinopse: '', capa_url: '', url_stream: '' });
      // Opcional: voltar para o painel após sucesso
      // setTimeout(() => navigate(`/admin/painel?token=${token}`), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to={`/admin/painel?token=${token}`} className="text-gray-400 hover:text-white flex items-center gap-2 mb-4">
            <ArrowLeft size={18} /> Voltar ao Painel
          </Link>
          <h1 className="text-2xl font-bold">Adicionar Novo Filme</h1>
        </div>

        {msg && (
          <div className={`mb-6 p-4 rounded border ${msg.tipo === 'sucesso' ? 'bg-green-900/20 border-green-600 text-green-400' : 'bg-red-900/20 border-red-600 text-red-400'}`}>
            {msg.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Título do Filme</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Capa URL (Imagem)</label>
            <input
              type="url"
              name="capa_url"
              value={form.capa_url}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">URL do Stream (Video/M3U8)</label>
            <input
              type="url"
              name="url_stream"
              value={form.url_stream}
              onChange={handleChange}
              placeholder="https://exemplo.com/video.mp4"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Sinopse</label>
            <textarea
              name="sinopse"
              value={form.sinopse}
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded flex justify-center items-center gap-2 transition"
          >
            {loading ? 'Salvando...' : <><Save size={20} /> Salvar Filme</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoFilme;