import { Pipe, PipeTransform } from '@angular/core';
import { LibroModel } from './Domain/LIbroModel';

@Pipe({
  name: 'filterByTitle',
  standalone: true
})
export class FilterByTitlePipe implements PipeTransform {

  transform(libros: LibroModel[], searchText: string): LibroModel[] {
    if (!libros || !searchText) {
      return libros;
    }
    return libros.filter(libro =>
      libro.titulo.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
