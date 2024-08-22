import { ClasseJudicial } from "./classe-judicial"
import { Documento } from "./documento";
import { Movimentacao } from "./movimentacao"
import { OrgaoJulgador } from "./orgao-julgador"
import { Parte } from "./parte"

export interface Processo {
  id: number;
  numero: string;
  numeroUnico: string;
  numeroOriginario: string;
  classeSequencial: string;
  localizacaoAtual: string;
  nomeMagistrado: string;
  classeJudicial: ClasseJudicial;
  instancia: string;
  orgao: string;
  sistema: string;
  orgaoJulgador: OrgaoJulgador;
  orgaoJulgadorColegiado: OrgaoJulgador;
  dataAutuacao: string;
  dataDistribuicao: string;
  cumprimentoDiligencia:	boolean;
  sigiloso: boolean;
  url:	string;
  tarefas: string[];
  numeroSequencial: string;
  partes: Parte[];
  assuntos: string[];
  processosAssociados: string[];
  movimentacoes: Movimentacao[];
  localizacoes: string[];
  temas: number[];
  documentos: Documento[];
  dataUltimaMovimentacao: string;
  identificador: string;
  ordenacao: number;

  primeiraParteAtiva?: Parte;
  primeiraPartePassiva?: Parte;
}
