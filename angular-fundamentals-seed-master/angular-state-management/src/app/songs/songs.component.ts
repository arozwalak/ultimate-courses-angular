import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { SongsFavouritesComponent } from './components/songs-favourites/songs-favourites.component';
import { SongsListenedComponent } from './components/songs-listened/songs-listened.component';
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { SongsService } from './services/songs.service';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SongsFavouritesComponent,
    SongsListenedComponent,
    SongsPlaylistComponent,
    SongsListenedComponent,
  ],
  providers: [SongsService],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss',
})
export class SongsComponent {}
