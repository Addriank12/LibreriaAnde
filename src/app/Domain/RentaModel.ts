export class RentaModel {
    id?: string; // Opcional, solo si necesitas un identificador único
    tituloLibro: string;
    userName: string;
    fechaRenta: string; // Puede ser un objeto Date si prefieres manejar fechas con más precisión
    fechaDevolucion?: string; // Opcional, puede ser null o undefined si la devolución no ha ocurrido
    estado: 'pendiente' | 'devuelto'; // Ejemplo de estado que puede ser 'pendiente' o 'devuelto'
  
    constructor(
      tituloLibro: string,
      userName: string,
      fechaRenta: string,
      estado: 'pendiente' | 'devuelto'
    ) {
      this.tituloLibro = tituloLibro;
      this.userName = userName;
      this.fechaRenta = fechaRenta;
      this.estado = estado;
    }
  }
  