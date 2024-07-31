import { Component } from '@angular/core';
import { ReservaModel } from '../../Domain/ReservaModel';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentaService } from '../../Services/renta.service';
import { UserInfo } from '../../Domain/UserInfoModel';
import { UserInfoService } from '../../Services/user-info.service';

@Component({
  selector: 'app-repportes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './repportes.component.html',
  styleUrl: './repportes.component.css',
})
export class RepportesComponent {
  reservas: ReservaModel[] = [];
  usuarios: UserInfo[] = [];
  userFilter: string = '';
  bookFilter: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedReportType: string = 'reservas';

  constructor(
    private reservaService: RentaService,
    private userInfoService: UserInfoService
  ) {
    (async () => {
      this.reservas = await reservaService.getRentas();
      this.usuarios = await userInfoService.getAllUsers();
    })();
  }

  filteredReservas(): ReservaModel[] {
    const userFilterLower = this.userFilter.toLowerCase();
    const bookFilterLower = this.bookFilter.toLowerCase();

    return this.reservas.filter(
      (reserva) =>
        reserva.user.userName.toLowerCase().includes(userFilterLower) &&
        reserva.libro.titulo.toLowerCase().includes(bookFilterLower) &&
        (!this.startDate ||
          new Date(reserva.fechaRenta) >= new Date(this.startDate)) &&
        (!this.endDate ||
          new Date(reserva.fechaRenta) <= new Date(this.endDate))
    );
  }

  exportUsuariosToCSV() {
    const csvData = this.usuarios.map(usuario => ({
      Email: usuario.email,
      'Nombre de Usuario': usuario.userName,
      Teléfono: usuario.telefono,
      Dirección: usuario.direccion
    }));

    const csvContent = this.convertToCSV(csvData);
    this.downloadCSV(csvContent, 'usuarios_report.csv');
  }

  convertToCSV(data: any[]): string {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }

  downloadCSV(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  exportToCSV(): void {
    const csvData = this.filteredReservas().map((reserva) => ({
      ID: reserva.id,
      Usuario: reserva.user.userName,
      Libro: reserva.libro.titulo,
      Estado: reserva.estado,
      'Fecha de Renta': new Date(reserva.fechaRenta)
        .toISOString()
        .split('T')[0],
      'Fecha de Devolución': new Date(reserva.fechaDevolucion)
        .toISOString()
        .split('T')[0],
    }));

    const csvContent = this.convertToCSV(csvData);
    this.downloadCSV(csvContent, 'reportes_reservas.csv');
  }
}
