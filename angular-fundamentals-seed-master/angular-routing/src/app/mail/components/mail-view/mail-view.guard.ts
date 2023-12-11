import {CanDeactivateFn} from "@angular/router";
import {MailViewComponent} from "./mail-view.component";

export const canDeactivate: CanDeactivateFn<MailViewComponent> =
  (component,
   currentRoute,
   currentState,
   nextState) => {
  console.log(component);
  if (component.hasUnsavedChanges) {
    return window.confirm('Are you sure you want to leave?');
  }
  return true;
}
