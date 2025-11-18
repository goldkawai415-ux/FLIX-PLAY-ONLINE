import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- Componente de Segurança (Error Boundary) ---
// Isso impede que a tela fique totalmente preta (Branca da morte) se houver erro de JS.
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 font-sans">
          <div className="bg-red-950/50 border border-red-600 p-8 rounded-xl max-w-2xl w-full shadow-2xl">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Ops! Ocorreu um erro crítico.</h1>
            <p className="text-gray-300 mb-6">
              A aplicação encontrou um problema inesperado e precisou ser interrompida para evitar travamentos.
            </p>
            
            <div className="bg-black/50 p-4 rounded border border-red-900/50 overflow-auto max-h-64 mb-6">
              <code className="text-red-300 font-mono text-sm break-all">
                {this.state.error?.toString()}
              </code>
            </div>

            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors w-full sm:w-auto"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento raiz para montar a aplicação");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);