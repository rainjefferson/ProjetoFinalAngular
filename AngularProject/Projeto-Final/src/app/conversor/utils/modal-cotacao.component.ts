import {
  Component, Input, Output, EventEmitter
} from '@angular/core';

import { ConversaoResponse, Conversao, ConversorService } from '../../conversor';

@Component({
  selector: 'modal-cotacao',
  standalone: false,
  
  templateUrl: './modal-cotacao.component.html',
  styleUrl: './modal-cotacao.component.css'
})
export class ModalCotacaoComponent {
  @Input() id!: string;
  @Input() conversaoResponse!: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService: ConversorService) { }

  novaConsulta() {
    this.onConfirm.emit();
  }

  get valorConvertido(): string {
    if (this.conversaoResponse?.rates && this.conversao?.moedaPara && this.conversao?.valor !== undefined && this.conversaoResponse.rates[this.conversao.moedaPara] !== undefined) {
      const rate = this.conversaoResponse.rates[this.conversao.moedaPara];
      return (this.conversao.valor * rate).toFixed(2);
    } else {
      return '0';
    }
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(
      this.conversaoResponse, this.conversao);
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(
      this.conversaoResponse, this.conversao);
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(
      this.conversaoResponse);
  }
  

}
