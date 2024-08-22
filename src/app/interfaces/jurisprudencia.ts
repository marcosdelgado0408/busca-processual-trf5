import { Doutrina } from "./doutrina"
import { Publicacao } from "./publicacao"

export interface Jurisprudencia {
  decisao:	string;
  indexacao:	string;
  referencia:	string;
  outrasReferencias:	string;
  observacao:	string;
  url:	string;
  referenciasLegislativas: string[];
  publicacoes: Publicacao[];
  votantes: string[];
  doutrinas: Doutrina[];
}
