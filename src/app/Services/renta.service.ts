import { Injectable } from '@angular/core';
import { RentaModel } from '../Domain/RentaModel';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  constructor() { }

  async updateRenta(renta: RentaModel): Promise<void> {
    

  }

  async getReservasUsuario(usuarioId: string): Promise<RentaModel[]> {
    return [];
  }

  async rentarLibro(titulo: string, fechaRenta: string): Promise<void> {}

  async getRentas(): Promise<RentaModel[]> {
    return [];
  }
}
