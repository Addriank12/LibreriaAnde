import { LibroModel } from './LIbroModel';
import { UserInfo } from './UserInfoModel';

export class ReservaModel {
  id: string;
  user: UserInfo;
  libro: LibroModel;
  estado: 'pendiente' | 'devuelto';
  fechaRenta: string;
  fechaDevolucion: string;

  constructor(
    id: string,
    user: UserInfo,
    libro: LibroModel,
    estado: 'pendiente' | 'devuelto',
    fechaRenta: string,
    fechaDevolucion: string
  ) {
    this.id = id;
    this.user = user;
    this.libro = libro;
    this.estado = estado;
    this.fechaRenta = fechaRenta;
    this.fechaDevolucion = fechaDevolucion;
  }
}
