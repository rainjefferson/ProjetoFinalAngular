import { Component, OnInit } from '@angular/core';
import { TarefaService, Tarefa } from '../shared';

@Component({
  selector: 'app-listar-tarefas',
  standalone: false,
  
  templateUrl: './listar-tarefas.component.html',
  styleUrl: './listar-tarefas.component.css'
})
export class ListarTarefasComponent implements OnInit {
  public tarefas!: Tarefa[];

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.tarefas = this.listarTodos();    
  }

  listarTodos(): Tarefa[] {
    return this.tarefaService.listarTodos();
  }

  remover($event: any, tarefa: Tarefa): void {
    $event.preventDefault();
    let idatualizar!: number;
    idatualizar = tarefa.id ? tarefa.id : 0;
    if (confirm('Deseja remover a tarefa "' + tarefa.nome + '"?')) {
      this.tarefaService.remover(idatualizar);
      this.tarefas = this.tarefaService.listarTodos();
    }
  }

  alterarStatus(tarefa: Tarefa): void {
    let idatualizar!: number;
    idatualizar = tarefa.id ? tarefa.id : 0;
    if (confirm('Deseja alterar o status da tarefa "' + tarefa.nome + '"?')) {
      this.tarefaService.alterarStatus(idatualizar);
      this.tarefas = this.tarefaService.listarTodos();
    }
  }

}

