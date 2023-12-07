import { Component } from '@angular/core';
import {ExampleOneComponent} from "./one/one.component";
import {ExampleTwoComponent} from "./two/two.component";
import {ExampleThreeComponent} from "./three/three.component";

@Component({
  selector: 'app-view-encapsulation',
  standalone: true,
  imports: [
    ExampleOneComponent,
    ExampleTwoComponent,
    ExampleThreeComponent
  ],
  template: `
    <div>
      <app-example-one></app-example-one>
      <app-example-two></app-example-two>
      <app-example-three></app-example-three>
    </div>

  `,
  styles: ``
})
export class ViewEncapsulationComponent {

}
