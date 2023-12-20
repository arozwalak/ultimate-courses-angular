import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { Observable, filter, map } from 'rxjs';
import { Song, SongsService } from '../../services/songs.service';
import { CommonModule } from '@angular/common';
import { SongsListComponent } from '../songs-list/songs-list.component';

@Component({
  selector: 'app-songs-favourites',
  standalone: true,
  imports: [CommonModule, SongsListComponent],
  templateUrl: './songs-favourites.component.html',
  styleUrl: './songs-favourites.component.scss',
})
export class SongsFavouritesComponent implements OnInit {
  favourites$!: Observable<Song[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.favourites$ = this.store.select<Song[]>('playlist').pipe(
      filter((playlist) => !!playlist),
      map((playlist) => playlist.filter((track) => track.favourite))
    );
  }

  onToggle(event: any) {
    this.songsService.toggle(event);
  }
}
