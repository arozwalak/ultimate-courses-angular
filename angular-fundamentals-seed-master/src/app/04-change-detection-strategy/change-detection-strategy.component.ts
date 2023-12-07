import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ExampleOneComponent} from "./one/one.component";
import {ExampleTwoComponent} from "./two/two.component";

@Component({
  selector: 'app-change-detection-strategy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ExampleOneComponent,
    ExampleTwoComponent
  ],
  template: `
    <div>
      <button (click)="addProp()">Add property</button>
      <button (click)="changeUser()">Change user object</button>
      <button (click)="changeName()">Change name property</button>
      <div class="users">
        <app-example-one [user]="user"></app-example-one>
        <app-example-two [user]="user"></app-example-two>
      </div>
    </div>
  `,
  styles: ``
})
export class ChangeDetectionStrategyComponent {
  user: any = {
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  }

  addProp() {
    this.user.email = 'blink@blink-182.net';
  }

  changeName() {
    this.user.name = 'Travis Barker';
  }

  changeUser() {
    this.user = {
      name: 'Tom Delonge',
      age: 41,
      location: 'California'
    };
  }
}
