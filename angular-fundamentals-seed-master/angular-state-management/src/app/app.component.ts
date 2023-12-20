import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from './store';
import { SongsComponent } from './songs/songs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SongsComponent],
  providers: [Store],
  styleUrl: './app.component.scss',
  template: `
    <div>
      <!-- <div *ngFor="let todo of todos$ | async">
        {{ todo.name }}
      </div> -->

      <app-songs></app-songs>
    </div>
  `,
})
export class AppComponent {
  todos$ = this.store.select<any[]>('todos');

  constructor(private store: Store) {
    console.log(this.store);
    this.store.set('todos', [
      { id: 1, name: 'Eat dinner' },
      { id: 2, name: 'Do washing' },
    ]);
  }
}
