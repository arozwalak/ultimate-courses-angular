import { Component } from '@angular/core';

import { Mail } from '../../models/mail.interface';
import { ActivatedRoute, Data } from "@angular/router";
import { map, Observable } from "rxjs";


@Component({
  selector: 'mail-folder',
  styleUrls: ['mail-folder.component.scss'],
  template: `
    <h2>{{ title | async }}</h2>
    <mail-item
      *ngFor="let message of (messages | async)"
      [message]="message">
    </mail-item>
  `
})
export class MailFolderComponent {

  messages: Observable<Mail[]> = this.route.data.pipe(
    map((data: Data) => data['messages'])
  );

  title: Observable<string | null> = this.route.paramMap.pipe(
    map((params) => params.get('name'))
  );
  constructor(private route: ActivatedRoute) {

  }
}
