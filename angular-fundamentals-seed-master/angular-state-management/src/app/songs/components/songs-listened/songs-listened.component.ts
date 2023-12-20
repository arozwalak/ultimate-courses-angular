import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { Song, SongsService } from '../../services/songs.service';
import { Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SongsListComponent } from '../songs-list/songs-list.component';

@Component({
  selector: 'app-songs-listened',
  standalone: true,
  imports: [CommonModule, SongsListComponent],
  templateUrl: './songs-listened.component.html',
  styleUrl: './songs-listened.component.scss',
})
export class SongsListenedComponent implements OnInit {
  listened$!: Observable<Song[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.listened$ = this.store.select<Song[]>('playlist').pipe(
      filter((playlist) => !!playlist),
      map((playlist) => playlist.filter((track) => track.listened))
    );
  }

  onToggle(event: any) {
    this.songsService.toggle(event);
  }
}
