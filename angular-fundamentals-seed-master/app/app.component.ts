import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";

import { User } from "./auth-form/auth-form.interface";

import { AuthFormComponent } from "./auth-form/auth-form.component";

@Component({
  selector: "app-root",
  styles: [
    `
      :host > div {
        display: block;
      }
    `,
  ],
  template: `
    <app-tmpl></app-tmpl>

    <div>
      <button (click)="destroyComponent()">Destroy</button>
      <button (click)="moveComponent()">Move</button>
      <div #entry></div>
      <template #tmpl let-name let-location="location">
        {{ name }} : {{ location }}
      </template>
    </div>
  `,
})
export class AppComponent implements AfterContentInit {
  @ViewChild("entry", { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild("tmpl") tmpl: TemplateRef<any>;
  component: ComponentRef<AuthFormComponent>;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    const authFormFactory =
      this.resolver.resolveComponentFactory(AuthFormComponent);

    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = "Create account";
    this.component.instance.submitted.subscribe(this.loginUser);

    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: "Todd Motto",
      location: "England, UK",
    });
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
