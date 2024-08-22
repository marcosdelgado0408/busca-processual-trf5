import { Documento } from "./documento";
import { Resultado } from "./resultado";
import { SistemaProcessual } from "./sistema-processual";

export interface ResultadoConsultaDocumento {
  orgao: string;
  sistemaProcessual: SistemaProcessual;
  resultado: Resultado;
  documentos: Documento[];
  totalDocumentos: number;
}


