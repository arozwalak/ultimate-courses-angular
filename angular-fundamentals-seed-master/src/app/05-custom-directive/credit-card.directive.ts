import {Directive, HostListener, HostBinding, ElementRef} from '@angular/core';

@Directive({
  selector: '[credit-card]',
  standalone: true
})
export class CreditCardDirective {

  @HostBinding('style.border')
  border!: string;

  @HostListener('input', ['$event'])
  onKyeDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substring(0, 16);
    }

    let numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      const x = trimmed.substring(i, i + 4);
      numbers.push(x);
    }

    input.value = numbers.join(' ');

    this.border = '';
    if (/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }

  constructor(
    private element: ElementRef
  ) {
    console.log(this.element);
  }


}
