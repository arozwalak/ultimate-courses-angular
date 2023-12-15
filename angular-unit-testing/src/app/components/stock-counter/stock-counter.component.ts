import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'stock-counter',
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div
      class="stock-counter"
      [class.focused]="focus">
      <div>
        <div
          tabindex="0"
          (keydown)="onKeyDown($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)">
          <p>{{ value }}</p>
          <div>
            <button
              type="button"
              [disabled]="value === max"
              (click)="increment()">
              +
            </button>
            <button
              type="button"
              [disabled]="value === min"
              (click)="decrement()">
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StockCounterComponent {
  @Input() step: number = 1;
  @Input() min: number = 0;
  @Input() max: number = 100;

  @Output() changed = new EventEmitter<number>();

  value: number = 10;
  focus: boolean = false;

  onKeyDown(event: KeyboardEvent) {
    const handlers: any = {
      ArrowDown: () => this.decrement(),
      ArrowUp: () => this.increment(),
    };

    if (handlers[event.code]) {
      handlers[event.code]();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
  }

  increment() {
    if (this.value < this.max) {
      this.value += this.step;
      this.changed.emit(this.value);
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.changed.emit(this.value);
    }
  }
}
