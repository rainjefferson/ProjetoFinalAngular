import { Injectable } from '@angular/core';
import { Tarefa } from './';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor() { }

  atualizarStorage(tarefas: Tarefa[]): void {
    if (typeof Storage !== 'undefined') {
      localStorage['tarefas'] = JSON.stringify(tarefas);
    } else {
      console.error('LocalStorage não suportado neste navegador.');
    }
  }

  listarTodos(): Tarefa[] {
    const tarefas = localStorage['tarefas'];
    return tarefas ? JSON.parse(tarefas) : [];
  }

  cadastrarTarefa(tarefa: Tarefa): void {
    const tarefas = this.listarTodos();
    tarefa.id = new Date().getTime();
    tarefas.push(tarefa);
    this.atualizarStorage(tarefas);    
  }

  buscarPorId(id: number): Tarefa {
    const tarefas: Tarefa[] = this.listarTodos() || [];
    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    return tarefa ? tarefa : new Tarefa;
  }

  atualizar(tarefa: Tarefa): void {
    const tarefas: Tarefa[] = this.listarTodos() || [];
    tarefas.forEach((obj, index, objs) => {
      if (tarefa.id === obj.id) {
        objs[index] = tarefa;
      }
    });
    this.atualizarStorage(tarefas); 
  }

  remover(id: number): void {
    let tarefas: Tarefa[] = this.listarTodos() || [];
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    this.atualizarStorage(tarefas); 
  }

  alterarStatus(id: number): void {
    const tarefas: Tarefa[] = this.listarTodos() || [];
    tarefas.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].concluida = !obj.concluida;
      }
    });
    this.atualizarStorage(tarefas); 
  }
}
