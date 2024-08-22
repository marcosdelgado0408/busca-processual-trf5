import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SearchAdvancedParamsService } from '../../services/search-advanced-params.service';

type inputTypes = "text" | "numeroDocumento"

@Component({
  selector: 'app-advanced-input',
  standalone: true,
  imports: [
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './advanced-input.component.html',
  styleUrl: './advanced-input.component.css'
})
export class AdvancedInputComponent implements OnDestroy, AfterViewInit {
  constructor(private params: SearchAdvancedParamsService) { }

  @Input() type: inputTypes = "text";
  @Input() value = "";
  @Input() label = "";
  @Input() inputName = "";
  @Input() maskValue = "";

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }
  onChange(value: string) {
    if (this.inputName === "numeroDocumento") {
      if (value.length > 14) {
        this.maskValue = '00.000.000/0000-00';
      } else {
        this.maskValue = '000.000.000-000';
      }
    }    
    if(this.inputName === "oabWord"){
      value = value.toUpperCase();
      this.maskValue = "A";
    }
    switch (this.inputName) {
      case 'numeroDocumento':
        this.params.numeroDocumento = value;
        break;
      case 'numeroProcesso': this.params.numero = value;
        break;
      case 'nomeParte': this.params.nomeParte = value;
        break;
      case 'nomeAdvogado': this.params.nomeParte = value;
        break;
      case 'classeJudicial': this.params.classeJudicial = value;
        break;      
      case 'oabWord': this.params.numeroOabWord = value;
        break;
      case 'oabNumber': this.params.numeroOabNumber = value;
        break;
    }
    this.value = value;
    console.log(this.inputName);
  }


  ngAfterViewInit(): void {
    // Definir o ouvinte para o evento de limpeza após a visualização ser inicializada
    if (typeof window !== 'undefined') {
      this.clearValue = this.clearValue.bind(this)
      window.addEventListener('clearForm', this.clearValue);
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('clearForm', this.clearValue);
    }
  }

  clearValue(): void {
    this.value = "";
  }

}
