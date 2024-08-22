import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Isto faz com que o serviço seja singleton
})
export class SearchAdvancedParamsService {

  public origem: string;
  public nomeParte: string;
  public numero: string;
  public numeroDocumento: string;
  public numeroOabNumber: string;
  public numeroOabUF: string;
  public numeroOabWord: string;
  public classeJudicial: string;

  constructor() {
    this.origem = '';
    this.nomeParte = ''
    this.numero = ''
    this.numeroDocumento = ''
    this.numeroOabNumber = ''
    this.numeroOabUF = ''
    this.numeroOabWord = ''
    this.classeJudicial = ''    
  }
}