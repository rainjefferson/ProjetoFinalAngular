import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Moeda, Conversao, ConversaoResponse } from '../models';
import { MoedaService, ConversorService } from '../services';

declare var bootstrap: any;

@Component({
  selector: 'app-conversor',
  standalone: false,
  
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit {

  moedas!: Moeda[];
  conversao!: Conversao;
  possuiErro!: boolean;
  conversaoResponse!: ConversaoResponse;

  @ViewChild("conversaoForm", { static: true }) conversaoForm!: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService) { }

  ngOnInit() {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */
  init(): void {
    this.conversao = new Conversao('EUR', 'BRL', 0);
    this.possuiErro = false;
  }

  /**
   * Efetua a chamada para a conversão dos valores.
   *
   * @return void
   */
  converter(): void {
    if (this.conversaoForm.form.valid) {
      this.conversorService
        .converter(this.conversao)
        .subscribe(
          response => {
            this.conversaoResponse = response;
            this.abrirModal();
          },
          error => this.possuiErro = true
        );
    }
  }

  abrirModal(): void {
    const modalElement = document.getElementById('modalCotacao');
    const modalInstance = new bootstrap.Modal(modalElement!);
    modalInstance.show();
  }

}
