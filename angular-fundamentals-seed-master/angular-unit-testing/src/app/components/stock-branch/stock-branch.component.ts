import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'stock-branch',
  styleUrls: ['stock-branch.component.scss'],
  template: `
    <div [formGroup]="store">
      <input
        type="text"
        placeholder="Branch ID"
        formControlName="branch" />
      <div
        class="error"
        *ngIf="required('branch')">
        Branch ID is required
      </div>
      <div
        class="error"
        *ngIf="invalid">
        Invalid branch code: 1 letter, 3 numbers
      </div>
      <div
        class="error"
        *ngIf="unknown">
        Unknown branch, please check the ID
      </div>

      <input
        type="text"
        placeholder="Manager Code"
        formControlName="code" />
      <div
        class="error"
        *ngIf="required('code')">
        Manager ID is required
      </div>
    </div>
  `,
})
export class StockBranchComponent {
  @Input()
  store!: FormGroup;

  get invalid() {
    return (
      this.store.get('branch')?.hasError('invalidBranch') &&
      this.store.get('branch')?.dirty &&
      !this.required('branch')
    );
  }

  get unknown() {
    return (
      this.store.get('branch')?.hasError('unknownBranch') &&
      this.store.get('branch')?.dirty
    );
  }

  required(name: string) {
    return (
      this.store.get(name)?.hasError('required') &&
      this.store.get(name)?.touched
    );
  }
}
