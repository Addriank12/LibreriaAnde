import { Component } from '@angular/core';
import { ReservaModel } from '../../Domain/ReservaModel';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentaService } from '../../Services/renta.service';
import { UserInfo } from '../../Domain/UserInfoModel';

@Component({
  selector: 'app-repportes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './repportes.component.html',
  styleUrl: './repportes.component.css'
})
export class RepportesComponent {
  reservas: ReservaModel[] = [];
  usuarios: UserInfo[] = [];
  userFilter: string = '';
  bookFilter: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private reservaService: RentaService) {
      (async () => {
          this.reservas = await reservaService.getRentas();
      })();
  }

  filteredReservas(): ReservaModel[] {
    const userFilterLower = this.userFilter.toLowerCase();
    const bookFilterLower = this.bookFilter.toLowerCase();
  
    return this.reservas.filter(reserva => 
      reserva.user.userName.toLowerCase().includes(userFilterLower) && 
      reserva.libro.titulo.toLowerCase().includes(bookFilterLower) &&
      (!this.startDate || new Date(reserva.fechaRenta) >= new Date(this.startDate)) &&
      (!this.endDate || new Date(reserva.fechaRenta) <= new Date(this.endDate))
    );
  }

  exportToCSV(): void {
    const csvData = this.filteredReservas().map(reserva => ({
      ID: reserva.id,
      Usuario: reserva.user.userName,
      Libro: reserva.libro.titulo,
      Estado: reserva.estado,
      'Fecha de Renta': new Date(reserva.fechaRenta).toISOString().split('T')[0],
      'Fecha de Devolución': new Date(reserva.fechaDevolucion).toISOString().split('T')[0]
    }));

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      Object.keys(csvData[0]).join(',') + '\n' + 
      csvData.map(e => Object.values(e).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'reportes_reservas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
