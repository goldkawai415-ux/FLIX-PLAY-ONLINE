export interface InterfaceFilme {
  id: number;
  titulo: string;
  sinopse: string;
  capa_url: string;
  url_stream: string;
}

export interface InterfaceCanal {
  id: number;
  nome: string;
  logo_url: string;
  url_stream: string;
}

export interface RespostaApi<T> {
  dados?: T;
  erro?: string;
}