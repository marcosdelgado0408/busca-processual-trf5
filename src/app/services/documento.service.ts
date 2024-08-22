import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultadoConsultaDocumento } from '../interfaces/resultado-consulta-documento';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private baseUrl = '/api/cp/api/v1';
  private token: string = environment.token;

  constructor(private http: HttpClient) { }

  getDocumentos(
    orgao: string, 
    sistemaProcessual: string, 
    numeroProcesso: string
  ): Observable<ResultadoConsultaDocumento> {
    const params = new HttpParams()
      .set('orgao', orgao)
      .set('sistemaProcessual', sistemaProcessual)
      .set('numeroProcesso', numeroProcesso);


      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      });

    return this.http.get<ResultadoConsultaDocumento>(`${this.baseUrl}/documentos`, {headers, params});
  }
}
