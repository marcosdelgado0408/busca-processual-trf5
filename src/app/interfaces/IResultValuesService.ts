import { Processo } from "./processo";

export interface IResultValuesService {
    visibleProcessos: Processo[];
    processos: Processo[];
    processosPorPagina: number;
    paginaAtual: number;
  }