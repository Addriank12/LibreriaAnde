import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentaModel } from '../../Domain/RentaModel';
import { RentaService } from '../../Services/renta.service';

@Component({
  selector: 'app-gestion-r',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-r.component.html',
  styleUrl: './gestion-r.component.css'
})
export class GestionRComponent {
  rentas: RentaModel[] = [];

  constructor(private rentaService: RentaService) { }

  ngOnInit(): void {
    this.loadRentas();
  }

  async loadRentas() {
    this.rentas = await this.rentaService.getRentas();
  }

  async marcarComoDevuelto(renta: RentaModel) {
    renta.estado = 'devuelto';
    renta.fechaDevolucion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    await this.rentaService.updateRenta(renta);
    this.loadRentas(); // Recargar la lista de rentas
  }
}
