import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FileSizePipe} from "../filesize.pipe";

interface File {
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-my-custom-pipes',
  standalone: true,
  imports: [CommonModule, FileSizePipe],
  providers: [FileSizePipe],
  template: `
    <div>
      <div *ngFor="let file of files">
        <p>{{ file.name }}</p>
        <p>{{ file.size | filesize:'megabytes':'+' }}</p>
      </div>
    </div>
    <div>
      <div *ngFor="let file of mapped">
        <p>{{ file.name }}</p>
        <p>{{ file.size }}</p>
      </div>
    </div>
  `,
  styles: ``
})
export class MyCustomPipesComponent implements OnInit {

  files!: File[];
  mapped!: File[];

  constructor(
    private fileSizePipe: FileSizePipe
  ) {
  }

  ngOnInit() {
    this.files = [
      { name: 'logo.svg', size: 2120109, type: 'image/svg' },
      { name: 'banner.jpg', size: 18029, type: 'image/jpg' },
      { name: 'background.png', size: 17484562, type: 'image/png' }
    ];

    this.mapped = this.files.map((file) => {
      return {
        name: file.name,
        type: file.type,
        size: this.fileSizePipe.transform(file.size, 'MiB')
      }
    });
  }
}
