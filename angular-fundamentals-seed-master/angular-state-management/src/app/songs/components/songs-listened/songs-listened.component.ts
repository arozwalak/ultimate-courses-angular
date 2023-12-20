import { Component, OnInit } from '@angular/core';
import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service';
import { Observable, filter, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs-listened',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs-listened.component.html',
  styleUrl: './songs-listened.component.scss',
})
export class SongsListenedComponent implements OnInit {
  listened$!: Observable<any[]>;

  constructor(private store: Store, private songsService: SongsService) {}

  ngOnInit(): void {
    this.listened$ = this.store.select<any[]>('playlist').pipe(
      filter((playlist) => !!playlist),
      map((playlist) => playlist.filter((track) => track.listened))
    );
  }
}
