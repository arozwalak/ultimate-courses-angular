import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from './store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  providers: [Store],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

/*
var config = {
  apiKey: "AIzaSyCXz7GrHLBs-xlsCrr185iG4v4UrNreq2Y",
  authDomain: "fitness-app-e668a.firebaseapp.com",
  databaseURL: "https://fitness-app-e668a.firebaseio.com",
  projectId: "fitness-app-e668a",
  storageBucket: "fitness-app-e668a.appspot.com",
  messagingSenderId: "1014564696462"
};
*/
