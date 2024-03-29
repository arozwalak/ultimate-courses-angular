import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filesize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(size: number, extension: string = 'MB', sign: string = ''): any {
    return sign + (size / (1024 * 1024)).toFixed(2) + extension;
  }
}
