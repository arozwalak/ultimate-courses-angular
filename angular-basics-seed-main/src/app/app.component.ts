import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="app">
    <header class="header">
      <img class="logo" src="/assets/img/logo.svg" alt="Ultimate Donuts">
    </header>
    <app-donut-list></app-donut-list>


    <!--
    <h1>{{ message.length ? message : 'Nothing here...'}}</h1>
    <h1 [innerText]="message.length ? message : 'Nothing here...'"></h1>

    <h1 (click)="handleClick($event)">{{ newMessage }}</h1>
    <input [value]="message" (input)="handleInput($event)" #messageInput>
    <p>{{ messageInput.value }}</p>


    <h1 (click)="handleClick($event)">{{ newMessage }}</h1>
    <input [value]="message" (input)="newMessage = messageInput2.value" #messageInput2>
    -->
  </div>
  `,
  styles: [
    `
      .app {
        background: #fff;
        border-radius: 8px;
        max-width: 400px;
        width: 94%;
        margin: 25px auto;
        padding: 25px;
        border: 4px solid #ef9fc7;
      }
      .header {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
      }
      .logo {
        width: 100px;
        height: 88px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  message!: string;
  newMessage!: string;


  ngOnInit() {
    this.message = 'Hello World';
    console.log('Hello World!');
  }

  handleClick(event: Event) {
    console.log(event);
  }

  handleInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    console.log(value);
    this.newMessage = value;
  }
}
