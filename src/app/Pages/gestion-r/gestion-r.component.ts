import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterByUsernameforRentPipe } from "../../filter-by-usernamefor-rent.pipe";
import { RentaService } from '../../Services/renta.service';
import { ReservaModel } from '../../Domain/ReservaModel';
import { LibroService } from '../../Services/libro.service';

@Component({
  selector: 'app-gestion-r',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterByUsernameforRentPipe],
  templateUrl: './gestion-r.component.html',
  styleUrl: './gestion-r.component.css'
})
export class GestionRComponent {

  rentas: ReservaModel[] = [];
  searchText: string = '';
  
  constructor(private rentaService: RentaService, private libroService: LibroService) { }

  ngOnInit(): void {
    this.loadRentas();
  }

  async loadRentas() {
    this.rentas = await this.rentaService.getRentas();
  }

  async marcarComoDevuelto(renta: ReservaModel) {
    renta.estado = 'devuelto';
    renta.fechaDevolucion = new Date();
    await this.rentaService.updateRenta(renta);
    const libro = renta.libro;
    libro.existencias++;
    await this.libroService.updateLibro(libro); // Incrementar la existencia del libro
    this.loadRentas();
  }

  async marcarComoReservado(renta: ReservaModel, fechaInicio: string) {
    const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    if (fechaInicio === hoy) {
      renta.estado = 'reservado';
    } else {
      renta.estado = 'pendiente';
    }
    renta.fechaRenta = fechaInicio;
    await this.rentaService.updateRenta(renta);
    this.loadRentas();
  }
}
