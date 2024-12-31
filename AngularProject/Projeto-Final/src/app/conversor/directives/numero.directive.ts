import {
  Directive,
  HostListener,
  ElementRef,
  forwardRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

@Directive({
  selector: '[numero]',
  standalone: false,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumeroDirective),
    multi: true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched: any = () => { };
  onChange: any = () => { };

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor = $event.target.value;

    // Permite apenas dígitos e ponto decimal
    valor = valor.replace(/[^0-9.]/g, '');

    // Garante que apenas um ponto decimal seja permitido
    const partes = valor.split('.');
    if (partes.length > 2) {
      valor = partes[0] + '.' + partes.slice(1).join('');
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn || (() => { });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn || (() => { });
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value ?? '';
  }
}
