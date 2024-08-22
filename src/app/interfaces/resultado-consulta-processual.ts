import { Processo } from "./processo";
import { Resultado } from "./resultado";
import { SistemaProcessual } from "./sistema-processual";

export interface ResultadoConsultaProcessual {
  orgao: string;
  sistemaProcessual: SistemaProcessual;
  resultado: Resultado;
  processos: Processo[];
  totalProcessos: number;
}

