import { inject } from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";

import {Mail} from "../../models/mail.interface";
import {MailService} from "../../mail.service";

export const mailFolderResolve: ResolveFn<Mail[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(MailService).getFolder(route.params['name']);
