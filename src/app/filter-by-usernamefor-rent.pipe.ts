import { Pipe, PipeTransform } from '@angular/core';
import { RentaModel } from './Domain/RentaModel';

@Pipe({
  name: 'filterByUsernameforRent',
  standalone: true
})
export class FilterByUsernameforRentPipe implements PipeTransform {

  transform(rentas: RentaModel[], searchText: string): RentaModel[] {
    if (!rentas || !searchText) {
      return rentas;
    }
    return rentas.filter(renta =>
      renta.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
