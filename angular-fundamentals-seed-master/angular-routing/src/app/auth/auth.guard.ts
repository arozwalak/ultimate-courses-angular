import {AuthService} from "./auth.service";
import {CanActivateChildFn, CanActivateFn, CanMatchFn, Route, UrlSegment} from "@angular/router";
import {inject} from "@angular/core";
import {of} from "rxjs";


export const canMatch: CanMatchFn = (route, segments) => {
  return inject(AuthService).checkPermissions();
}

export const canActivate: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn();
}

export const canActivateChild: CanActivateChildFn = () => {
  return inject(AuthService).isLoggedIn();
}
