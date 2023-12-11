import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true,
};

@Component({
  selector: 'stock-counter',
  providers: [COUNTER_CONTROL_ACCESSOR],
  styleUrls: ['stock-counter.component.scss'],
  template: `
    <div class="stock-counter" [class.focused]="focus">
      <div>
        <div
          tabindex="0"
          (keydown)="onKeyDown($event)"
          (blur)="onBlur($event)"
          (focus)="onFocus($event)"
        >
          <p>{{ value }}</p>
          <div>
            <button
              type="button"
              [disabled]="value === max"
              (click)="increment()"
            >
              +
            </button>
            <button
              type="button"
              [disabled]="value === min"
              (click)="decrement()"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StockCounterComponent implements ControlValueAccessor {
  private onTouch!: Function;
  private onModelChange!: Function;

  writeValue(value: any): void {
    this.value = value || 0;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

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
    this.onTouch();
  }

  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.onTouch();
  }

  increment() {
    if (this.value < this.max) {
      this.value += this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value -= this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
