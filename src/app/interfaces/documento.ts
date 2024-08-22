import { Julgamento } from "./julgamento"
import { Jurisprudencia } from "./jurisprudencia"
import { Processo } from "./processo"
import { TipoDocumento } from "./tipo-documento"

export interface Documento {
  idDocumento:	number;
  idBinario: number;
  tipo:	TipoDocumento;
  numero:	string;
  texto:	string;
  nomeAssinatura:	string;
  dataAssinatura:	string;
  julgamento:	Julgamento;
  jurisprudencia:	Jurisprudencia;
  sigiloso:	boolean;
  publico:	boolean;
  score:	number;
  processo: Processo;
  url:	string;
  identificador:	string;
  ordenacao:	number;
}
