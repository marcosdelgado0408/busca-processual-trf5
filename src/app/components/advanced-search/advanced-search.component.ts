import { Component } from '@angular/core';
import { AdvancedInputComponent } from '../advanced-input/advanced-input.component';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from "../header/header.component";
import { AdvancedInputSelectComponent } from "../advanced-input-select/advanced-input-select.component";
import { ProcessoService } from '../../services/processo.service';
import { Router, RouterLink } from '@angular/router';
import { SearchAdvancedParamsService } from '../../services/search-advanced-params.service';
import { Subscription } from 'rxjs';
import { ResultadoConsultaProcessual } from '../../interfaces/resultado-consulta-processual';
import { ResultAdvancedValuesService } from '../../services/result-advanced-values.service';
import { Parte } from '../../interfaces/parte';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AdvancedInputComponent,
    MatSelectModule,
    HeaderComponent,
    AdvancedInputSelectComponent,
    MatProgressBarModule,
    RouterLink
  ],
  templateUrl: './advanced-search.component.html',
  styleUrl: './advanced-search.component.css'
})
export class AdvancedSearchComponent {

  constructor(private processoService: ProcessoService, private router: Router, private params: SearchAdvancedParamsService, private resultValues: ResultAdvancedValuesService) { }

  private subscription: Subscription | null = null;
  private response: ResultadoConsultaProcessual[] = [];
  progress = 0;
  showProgress = false;
  nenhumProcessoEncontrado = false;

  optionsUf = [
    { value: 'UF', display: 'UF' },
    { value: 'AC', display: 'Acre' },
    { value: 'AL', display: 'Alagoas' },
    { value: 'AP', display: 'Amapá' },
    { value: 'AM', display: 'Amazonas' },
    { value: 'BA', display: 'Bahia' },
    { value: 'CE', display: 'Ceará' },
    { value: 'DF', display: 'Distrito Federal' },
    { value: 'ES', display: 'Espírito Santo' },
    { value: 'GO', display: 'Goiás' },
    { value: 'MA', display: 'Maranhão' },
    { value: 'MT', display: 'Mato Grosso' },
    { value: 'MS', display: 'Mato Grosso do Sul' },
    { value: 'MG', display: 'Minas Gerais' },
    { value: 'PA', display: 'Pará' },
    { value: 'PB', display: 'Paraíba' },
    { value: 'PR', display: 'Paraná' },
    { value: 'PE', display: 'Pernambuco' },
    { value: 'PI', display: 'Piauí' },
    { value: 'RJ', display: 'Rio de Janeiro' },
    { value: 'RN', display: 'Rio Grande do Norte' },
    { value: 'RS', display: 'Rio Grande do Sul' },
    { value: 'RO', display: 'Rondônia' },
    { value: 'RR', display: 'Roraima' },
    { value: 'SC', display: 'Santa Catarina' },
    { value: 'SP', display: 'São Paulo' },
    { value: 'SE', display: 'Sergipe' },
    { value: 'TO', display: 'Tocantins' }
  ];

  optionsOrigem = [
    { value: 'TRF5', display: 'TRF 5ª região' },
    { value: 'JFRN', display: 'JFRN' },
    { value: 'JFPB', display: 'JFPB' },
    { value: 'JFCE', display: 'JFCE' },
    { value: 'JFSE', display: 'JFSE' },
    { value: 'JFAL', display: 'JFAL' },
    { value: 'JFPE', display: 'JFPE' }
  ];
  OnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  clearForm(): void {
    // Emitir o evento de limpeza
    const event = new CustomEvent('clearForm');
    this.resultValues.processos = [];
    window.dispatchEvent(event);
  }
  searchAdvanced(): void {
    this.resultValues.processos =[];
    this.showProgress = true;
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress < 70) {
        this.progress += 1;
      } else {
        clearInterval(interval);
      }
    }, 250);
    console.log("origem: "+this.params.origem);
    const numerOab = (this.params.numeroOabUF + this.params.numeroOabNumber + this.params.numeroOabWord);
    this.subscription = this.processoService.getProcessosAdvanced(this.params.origem, this.params.nomeParte, this.params.numero, this.params.numeroDocumento, numerOab, this.params.classeJudicial)
      .subscribe({
        next: (data) => {
          console.log("data aqui: " + data)
          this.response = data;
          this.resultValues.processos = this.response[0].processos.map(processo => {
            const partesOrdenadas = this.sortPartes(processo.partes);
            return {
              ...processo,
              partes: partesOrdenadas,
              primeiraParteAtiva: partesOrdenadas.find(parte => parte.tipoPolo === 'A'),
              primeiraPartePassiva: partesOrdenadas.find(parte => parte.tipoPolo === 'P')
            };
          });
          this.updateProcessosVisiveis();
        },
        error: (error) => {
          console.error('Erro ao buscar processos:', error);
          this.router.navigate(['/pagina-error']);
        },
        complete: () => {
          console.log('Requisição completa');

          this.progress = 100;


          if (this.resultValues.processos.length == 0) {
            this.showProgress = false;
            this.nenhumProcessoEncontrado = true;
          } else {
            this.nenhumProcessoEncontrado = false;
            setTimeout(() => {
              this.showProgress = false
            }, 1000);
          }

        }
      });
  }

  sortPartes(partes: Parte[]): Parte[] {
    const poloA = partes.filter(parte => parte.tipoPolo === 'A').sort((a, b) => a.nome.localeCompare(b.nome));
    const poloP = partes.filter(parte => parte.tipoPolo === 'P').sort((a, b) => a.nome.localeCompare(b.nome));
    return [...poloA, ...poloP];
  }

  fecharDiv(): void {
    this.nenhumProcessoEncontrado = false;
  }

  private updateProcessosVisiveis(): void {
    this.resultValues.visibleProcessos = this.resultValues.processos.slice(0, this.resultValues.processosPorPagina * this.resultValues.paginaAtual);
  }
}
