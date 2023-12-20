import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs-playlist.component.html',
  styleUrl: './songs-playlist.component.scss',
})
export class SongsPlaylistComponent implements OnInit, OnDestroy {
  playlist$!: Observable<any[]>;
  subscription!: Subscription;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit() {
    this.playlist$ = this.store.select('playlist');
    this.subscription = this.songsService.getPlaylist$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
