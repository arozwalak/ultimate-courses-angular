import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { Observable, filter, map } from 'rxjs';
import { SongsService } from '../../services/songs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs-favourites.component.html',
  styleUrl: './songs-favourites.component.scss',
})
export class SongsFavouritesComponent implements OnInit {
  favourites$!: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.favourites$ = this.store.select<any[]>('playlist').pipe(
      filter((playlist) => !!playlist),
      map((playlist) => playlist.filter((track) => track.favourite))
    );
  }
}
