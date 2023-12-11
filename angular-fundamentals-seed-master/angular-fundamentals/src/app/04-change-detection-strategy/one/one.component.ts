import {ChangeDetectionStrategy, Component, Input} from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-example-one',
  changeDetection: ChangeDetectionStrategy.OnPush, // useful in stateless/dump components for faster rendering
  styles: [`
    .example-one {
      font-size: 19px;
      margin-bottom: 50px;
    }
  `],
  template: `
    <div class="example-one">
      <h4>{{ user.name }}</h4>
      <h5>{{ user.age }} years old</h5>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should not update</p>
    </div>
  `
})
export class ExampleOneComponent {
  @Input() user: any;

  update() {
    this.user.name = 'Matt Skiba';
  }
}
