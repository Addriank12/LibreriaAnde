import { Injectable } from '@angular/core';
import { ReservaModel } from '../Domain/ReservaModel';
import { ReservasController } from '../DataAcces/ReservasController';
import { UserCache } from '../Common/UserCache';
@Injectable({
  providedIn: 'root'
})
export class RentaService {


  reservaController: ReservasController = new ReservasController();

  constructor() { }

  async updateRenta(renta: ReservaModel): Promise<void> {
    await this.reservaController.update(renta);
  }

  async getReservasUsuario(usuarioId: string): Promise<ReservaModel[]> {
    return [];
  }

  async rentarLibro(reservaModel: ReservaModel): Promise<void> {
    await this.reservaController.add(reservaModel);
  }

  async getRentas(): Promise<ReservaModel[]> {
    return await this.reservaController.getAll();
  }
}
