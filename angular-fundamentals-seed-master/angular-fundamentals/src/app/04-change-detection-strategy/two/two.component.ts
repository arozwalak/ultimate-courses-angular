import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-example-two',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
    .example-two {
      font-size: 19px;
      margin-bottom: 50px;
    }
  `],
  template: `
    <div class="example-two">
      <h4>{{ user.name }}</h4>
      <h5>{{ user.age }} years old</h5>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should update</p>
    </div>
  `
})
export class ExampleTwoComponent {
  @Input() user: any;

  update() {
    this.user.name = 'Matt Skiba';
  }
}
