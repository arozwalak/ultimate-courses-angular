import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '../../store';
import { Observable, tap } from 'rxjs';

export interface Song {
  id: number;
  artist: string;
  track: string;
  listened: boolean;
  favourite: boolean;
}

@Injectable()
export class SongsService {
  getPlaylist$: Observable<Song[]> = this.http
    .get('/api/playlist')
    .pipe(tap((next: any) => this.store.set('playlist', next)));

  constructor(private http: HttpClient, private store: Store) {}

  toggle(event: any) {
    this.http
      .put<Song>(`/api/playlist/${event.track.id}`, event.track)
      .subscribe((track: Song) => {
        const value = this.store.value.playlist;

        const playlist = value.map((song: Song) => {
          if (event.track.id === song.id) {
            return { ...song, ...event.track };
          } else {
            return song;
          }
        });

        this.store.set('playlist', playlist);
      });
  }
}
