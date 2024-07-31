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

  async getRentasByUser(userId: string): Promise<ReservaModel[] | PromiseLike<ReservaModel[]>> {
    const reservas = await this.getRentas();
    return reservas.filter(reserva => reserva.user.email === userId);
  }

  async getProximasDevoluciones(userId: string): Promise<ReservaModel[]> {
    const reservas = await this.getRentas();
    const now = new Date();
    const proximasDevoluciones = reservas.filter(reserva => {
      const fechaDevolucion = new Date(reserva.fechaDevolucion);
      const diffDays = (fechaDevolucion.getTime() - now.getTime()) / (1000 * 3600 * 24);
      return reserva.user.email === userId && diffDays <= 7 && reserva.estado == "pendiente";
    });
    return proximasDevoluciones;
  }

}
