import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AdvancedSearchComponent } from "../../components/advanced-search/advanced-search.component";
import { ResultComponent } from "../../components/result/result.component";
import { ResultAdvancedValuesService } from '../../services/result-advanced-values.service';

@Component({
  selector: 'app-pesquisa-avancada',
  standalone: true,
  imports: [HeaderComponent, AdvancedSearchComponent, ResultComponent,],
  providers: [
    { provide: 'ResultValueService', useClass: ResultAdvancedValuesService }
  ],
  templateUrl: './pesquisa-avancada.component.html',
  styleUrl: './pesquisa-avancada.component.css'
})
export class PesquisaAvancadaComponent {
  constructor(public resultValues: ResultAdvancedValuesService){}
}
