import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tarefaConcluida]',
  standalone: false
})
export class TarefaConcluidaDirective implements OnInit {
  @Input() tarefaConcluida: boolean | undefined;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if(this.tarefaConcluida) {
      this.el.nativeElement.style.textDecoration = 'line-through'; 
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
    }
  }

}
