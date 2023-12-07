import { Component } from "@angular/core";

@Component({
  selector: "app-tmpl",
  template: `
    <div>
      <ng-container [ngTemplateOutlet]="tmpl"></ng-container>
      <template #tmpl>Todd Motto : England, UK</template>
    </div>
  `,
})
export class TemplateComponent {}
