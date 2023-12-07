import { Component } from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  template: `
    <div>
      <ng-container *ngTemplateOutlet="tmpl; context: ctx"></ng-container>

      <ng-template #tmpl let-name let-location="location">
        {{ name }} : {{ location }}
      </ng-template>
    </div>
  `,
  styles: ``
})
export class TemplateComponent {
  ctx = {
    $implicit: "Todd Motto",
    location: "England, UK",
  };
}
