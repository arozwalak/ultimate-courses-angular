import {
  Component,
  Output,
  ViewChildren,
  AfterViewInit,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectorRef,
} from "@angular/core";

import { AuthRememberComponent } from "./auth-remember.component";
import { AuthMessageComponent } from "./auth-message.component";

import { User } from "./auth-form.interface";

@Component({
  selector: "auth-form",
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel />
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel />
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message
          [style.display]="showMessage ? 'inherit' : 'none'"
        ></auth-message>
        <auth-message
          [style.display]="showMessage ? 'inherit' : 'none'"
        ></auth-message>
        <auth-message
          [style.display]="showMessage ? 'inherit' : 'none'"
        ></auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `,
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  @ContentChildren(AuthRememberComponent)
  remember: QueryList<AuthRememberComponent>;

  @ViewChildren(AuthMessageComponent)
  message: QueryList<AuthMessageComponent>;

  constructor(private cd: ChangeDetectorRef) {}

  showMessage: boolean;

  ngAfterViewInit(): void {
    if (this.message) {
      this.message.forEach((message) => {
        message.days = 30;
      });
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit(): void {
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe(
          (checked: boolean) => (this.showMessage = checked)
        );
      });
    }
  }
  onSubmit(value: User) {
    this.submitted.emit(value);
  }
}
