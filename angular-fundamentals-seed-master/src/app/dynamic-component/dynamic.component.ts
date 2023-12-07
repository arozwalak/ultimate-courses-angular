import {
  AfterViewInit,
  Component,
  ComponentRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {User} from "../auth-form/auth-form.interface";

@Component({
  selector: 'app-dynamic-component',
  standalone: true,
  imports: [],
  template: `
    <div>
      <button (click)="destroyComponent()">Destroy</button>
      <button (click)="moveComponent()">Move</button>

      <div #entry></div>

      <ng-template #tmpl let-name let-location="location">
        {{ name }} : {{ location }}
      </ng-template>
    </div>
  `,
  styles: ``
})
export class DynamicComponent implements AfterViewInit {
  @ViewChild("entry", { read: ViewContainerRef }) entry!: ViewContainerRef;
  @ViewChild("tmpl") tmpl!: TemplateRef<any>;

  component!: ComponentRef<AuthFormComponent>;

  constructor() {}

  ngAfterViewInit(): void {

    const compRef = this.entry.createComponent(AuthFormComponent);
    compRef.changeDetectorRef.detectChanges();

    this.component = this.entry.createComponent(AuthFormComponent, { index: 0 });
    this.component.instance.title = "Create account";
    this.component.instance.submitted.subscribe(this.loginUser);
    this.component.changeDetectorRef.detectChanges();

    const embeddedView = this.entry.createEmbeddedView(this.tmpl, {
      $implicit: "Todd Motto",
      location: "England, UK",
    });
    embeddedView.detectChanges()
  }

  destroyComponent() {
    this.component.destroy();
  }

  moveComponent() {
    this.entry.move(this.component.hostView, 1);
  }

  loginUser(user: User) {
    console.log("Login", user);
  }
}
