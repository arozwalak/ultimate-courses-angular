import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-example-three',
  encapsulation: ViewEncapsulation.None, // can be hard to maintain
  styles: [`
    .example-one {
      border: 2px solid green;
    }
  `],
  template: `
    <div class="example-three">
      Example Three
    </div>
    <div class="example-one">
      Example One!
    </div>
  `
})
export class ExampleThreeComponent {}
