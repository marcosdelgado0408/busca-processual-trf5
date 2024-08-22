import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DateFormatPipe } from '../../date-format.pipe';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { Component } from '@angular/core';
import { ResultComponent } from "../../components/result/result.component";
import { ResultValuesService } from '../../services/result-values.service';

@Component({
  selector: 'app-home',
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
    HeaderComponent,
    SearchComponent,
    ResultComponent,
],
providers:[
  {provide: 'ResultValueService', useClass: ResultValuesService}
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(public resultValues: ResultValuesService){}

  headerTitle1 = 'Busca processual Unificada';
  title = 'Busque por nome, número do processo, CPF ou CNPJ';
  searchPlaceholder = 'Digite um nome, cpf, cnpj ou número do processo';


  normalizeString(str: string): string {
    return str.replace(/[.-]/g, '');
  }

}
