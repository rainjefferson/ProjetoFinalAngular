import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TarefaService, Tarefa } from '../shared';

@Component({
  selector: 'app-cadastrar-tarefa',
  standalone: false,
  
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrl: './cadastrar-tarefa.component.css'
})
export class CadastrarTarefaComponent implements OnInit{
  @ViewChild('formTarefa', { static: true }) formTarefa!: NgForm;
  tarefa!: Tarefa;

  constructor(private tarefaService: TarefaService,
              private router: Router) { }

  ngOnInit() {
    this.tarefa = new Tarefa();
  }

  cadastrar(): void {
    if (this.formTarefa.form.valid) {
      this.tarefaService.cadastrarTarefa(this.tarefa);
      this.router.navigate(["/tarefas"]);
    }
  }

}
