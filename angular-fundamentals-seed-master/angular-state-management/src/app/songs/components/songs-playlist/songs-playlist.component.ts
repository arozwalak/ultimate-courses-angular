import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SongsListComponent } from '../songs-list/songs-list.component';

@Component({
  selector: 'app-songs-playlist',
  standalone: true,
  imports: [CommonModule, SongsListComponent],
  templateUrl: './songs-playlist.component.html',
  styleUrl: './songs-playlist.component.scss',
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {
  playlist$!: Observable<Song[]>;
  subscription!: Subscription;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.playlist$ = this.store.select<Song[]>('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onToggle(event: any) {
    this.songsService.toggle(event);
  }
}
