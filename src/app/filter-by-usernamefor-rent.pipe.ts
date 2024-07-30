import { Pipe, PipeTransform } from '@angular/core';
import { ReservaModel } from './Domain/ReservaModel';


@Pipe({
  name: 'filterByUsernameforRent',
  standalone: true
})
export class FilterByUsernameforRentPipe implements PipeTransform {

  transform(rentas: ReservaModel[], searchText: string): ReservaModel[] {
    if (!rentas || !searchText) {
      return rentas;
    }
    return rentas.filter(renta =>
      renta.user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
