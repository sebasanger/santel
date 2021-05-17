import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.base_url;
@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(path: String): String {
    return url + '/files/' + path;
  }
}
