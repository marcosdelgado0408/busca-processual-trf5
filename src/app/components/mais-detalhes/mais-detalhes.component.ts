import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { HeaderComponent } from '../header/header.component';
import { Parte } from '../../interfaces/parte';
import { ResultadoConsultaDocumento } from '../../interfaces/resultado-consulta-documento';
import { DocumentoService } from '../../services/documento.service';
import { Subscription } from 'rxjs';
import { Documento } from '../../interfaces/documento';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mais-detalhes',
  standalone: true,
  imports: [CommonModule, DateFormatPipe, HeaderComponent, FontAwesomeModule],
  templateUrl: './mais-detalhes.component.html',
  styleUrls: ['./mais-detalhes.component.css']
})
export class MaisDetalhesComponent implements OnInit {
  processo: any;
  groupedPartes: { [key: string]: Parte[] } = {};
  visibleGroups: { [key: string]: boolean } = {};

  headerTitle2 = 'Tribunal regional federal da quinta região';

  private response!: ResultadoConsultaDocumento;

  public documentos: Documento[] = [];
  public visibleDocumentos: Documento[] = [];
  public movimentacoes: any[] = [];
  public visibleMovimentacoes: any[] = [];

  private subscription: Subscription | null = null;

  faFileAlt = faFileAlt; // ícone de documento

  constructor(private router: Router, private documentoService: DocumentoService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.processo = navigation.extras.state['processo'];
    }
  }

  ngOnInit(): void {
    console.log(this.processo);
    this.groupPartes();
    this.getDocumentos('TRF5', 'PJE', this.processo.numero);
    this.getMovimentacoes();
  }

  groupPartes(): void {
    this.processo.partes.forEach((parte: Parte) => {
      if (!this.groupedPartes[parte.nome]) {
        this.groupedPartes[parte.nome] = [];
      }
      this.groupedPartes[parte.nome].push(parte);
    });

    console.log(this.groupedPartes);
  }

  toggleGroup(nome: string): void {
    this.visibleGroups[nome] = !this.visibleGroups[nome];
  }

  isGroupVisible(nome: string): boolean {
    return !!this.visibleGroups[nome];
  }

  getGroupedPartesKeys(): string[] {
    return Object.keys(this.groupedPartes);
  }

  getDocumentos(orgao: string, sistemaProcessual: string, numeroProceso: string): void {
    this.subscription = this.documentoService.getDocumentos(orgao, sistemaProcessual, numeroProceso)
      .subscribe({
        next: (data: ResultadoConsultaDocumento) => {
          this.response = data;
          this.documentos = data.documentos;
          this.updateVisibleDocumentos();
          console.log(this.response);
        },
        error: (error) => {
          console.error('Erro ao buscar documentos:', error);
          this.router.navigate(['/pagina-error']);
        },
        complete: () => {
          console.log('Requisição completa');
        }
      });
  }

  getMovimentacoes(): void {
    this.visibleMovimentacoes = this.processo.movimentacoes.slice(0, 5);
  }

  updateVisibleDocumentos(): void {
    this.visibleDocumentos = this.documentos.slice(0, 5);
  }

  loadMoreDocuments(): void {
    const currentLength = this.visibleDocumentos.length;
    const nextBatch = this.documentos.slice(currentLength, currentLength + 5);
    this.visibleDocumentos = this.visibleDocumentos.concat(nextBatch);
  }

  loadMoreMovimentacoes(): void {
    const currentLength = this.visibleMovimentacoes.length;
    const nextBatch = this.processo.movimentacoes.slice(currentLength, currentLength + 5);
    this.visibleMovimentacoes = this.visibleMovimentacoes.concat(nextBatch);
  }
}