
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MaisDetalhesComponent } from '../../components/mais-detalhes/mais-detalhes.component';

@Component({
  selector: 'app-detalhes-do-processo',
  standalone: true,
  imports: [MaisDetalhesComponent,HeaderComponent],
  templateUrl: './detalhes-do-processo.component.html',
  styleUrl: './detalhes-do-processo.component.css'
})
export class DetalhesDoProcessoComponent {

}
