import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Mail} from "../../models/mail.interface";
import {inject} from "@angular/core";
import {MailService} from "../../mail.service";

export const mailViewResolve: ResolveFn<Mail> =
  (route: ActivatedRouteSnapshot) => inject(MailService).getMessage(route.params['id']);

