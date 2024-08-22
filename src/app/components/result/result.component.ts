import { Component, Input } from '@angular/core';
import { ResultValuesService } from '../../services/result-values.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../date-format.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IResultValuesService } from '../../interfaces/IResultValuesService';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    DateFormatPipe,
    MatProgressBarModule,
    RouterModule,
    DateFormatPipe,
  ],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  constructor(private router: Router){}
  @Input() resultValues!: IResultValuesService;

  transformToArray(data: any): number[] {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error('Data format is invalid', data);
      }
    }
    return [];
  }

  navigateToDetalhes(processo: any) {
    this.router.navigate(['/mais-detalhes'], { state: { processo } });
  }

  carregarMaisProcessos(): void {
    const inicio = this.resultValues.visibleProcessos.length;
    const fim = inicio + this.resultValues.processosPorPagina;
    this.resultValues.visibleProcessos = [...this.resultValues.visibleProcessos, ...this.resultValues.processos.slice(inicio, fim)];
    this.resultValues.paginaAtual++;
  }
}
