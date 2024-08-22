import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import { SearchAdvancedParamsService } from '../../services/search-advanced-params.service';
@Component({
  selector: 'app-advanced-input-select',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './advanced-input-select.component.html',
  styleUrl: './advanced-input-select.component.css'
})
export class AdvancedInputSelectComponent implements OnDestroy, AfterViewInit{
  constructor(private params: SearchAdvancedParamsService) { }

  @Input() label = '';
  @Input() labelSelectName = '';
  @Input() selectName = '';
  @Input() selectId = '';
  @Input() options!: { value: string, display: string }[];
  @ViewChild('selectElement') selectElement!: ElementRef;
  
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
  onInput(event: Event){    
    const value = (event.target as HTMLSelectElement).value;
    this.onChange(value);
  }
  onChange(value: string){
    if(this.labelSelectName == "origem"){
      this.params.origem = value;
      console.log("trocouo");
    }else{
      this.params.numeroOabUF = value;
    }
    console.log(value);
  };
  clearValue(): void {
    this.selectElement.nativeElement.value = this.options[0].value;
  }

}
