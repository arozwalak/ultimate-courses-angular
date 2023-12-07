import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-example-one',
  encapsulation: ViewEncapsulation.Emulated, // default
  styles: [`
    .example-one {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 50px;
      padding: 10px 20px;
    }
  `],
  template: `
    <div class="example-one">
      Example one
    </div>
  `
})
export class ExampleOneComponent {}
