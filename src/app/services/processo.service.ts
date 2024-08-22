import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { ResultadoConsultaProcessual } from '../interfaces/resultado-consulta-processual';

@Injectable({
  providedIn: 'root'
})

export class ProcessoService {
  private baseUrl = environment.apiUrl;
  private token: string = environment.token;

  constructor(private http: HttpClient) { }

  getProcessos(    
    sistemaProcessual: string,
    searchTerm: string,
    searchParam: string,
    length: string // Novo parâmetro length com valor padrão

  ): Observable<ResultadoConsultaProcessual[]> {
    const baseParams = new HttpParams()
      .set('sistemaProcessual', sistemaProcessual)
      .set('start', '0')
      .set('length', length)
      .set(searchParam, searchTerm)
      .set('buscaNomeExato', 'true');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.get<ResultadoConsultaProcessual[]>(`${this.baseUrl}/processos?`, { headers, params:baseParams });
  }

  getProcessosAdvanced(
    origem?: string,
    nomeParte?: string,
    numero?: string,
    numeroDocumento?: string,
    numeroOab?: string,
    classeJudicial?: string
  ): Observable<ResultadoConsultaProcessual[]>{
    const baseParams = new HttpParams()
      .set('sistemaProcessual', "PJE")
      .set('orgao', origem ?? "")
      .set('numero', numero ?? "")
      .set('numeroDocumento', numeroDocumento ?? "")
      .set('numeroOab',numeroOab ?? "")
      .set('classeJudicial',classeJudicial ?? "")
      .set('start', '0')
      .set('length', length)
      .set('buscaNomeExato', 'true')
      .set('nomeParte', nomeParte ?? "");
      
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.get<ResultadoConsultaProcessual[]>(`${this.baseUrl}/processos?`, { headers, params: baseParams });
  }
}
