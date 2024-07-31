import { LibroModel } from './LIbroModel';
import { UserInfo } from './UserInfoModel';

export class ReservaModel {
  id: string;
  user: UserInfo;
  libro: LibroModel;
  estado: 'pendiente' | 'devuelto' | 'reservado';
  fechaRenta: Date;
  fechaDevolucion: Date;

  constructor(
    id: string,
    user: UserInfo,
    libro: LibroModel,
    estado: 'pendiente' | 'devuelto' | 'reservado',
    fechaRenta: Date,
    fechaDevolucion: Date
  ) {
    this.id = id;
    this.user = user;
    this.libro = libro;
    this.estado = estado;
    this.fechaRenta = fechaRenta;
    this.fechaDevolucion = fechaDevolucion;
  }
}
