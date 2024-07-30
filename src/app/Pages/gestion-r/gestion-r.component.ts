import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterByUsernameforRentPipe } from "../../filter-by-usernamefor-rent.pipe";
import { RentaService } from '../../Services/renta.service';
import { ReservaModel } from '../../Domain/ReservaModel';

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
  
  constructor(private rentaService: RentaService) { }

  ngOnInit(): void {
    this.loadRentas();
  }

  async loadRentas() {
    this.rentas = await this.rentaService.getRentas();
  }

  async marcarComoDevuelto(renta: ReservaModel) {
    renta.estado = 'devuelto';
    renta.fechaDevolucion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    await this.rentaService.updateRenta(renta);
    //await this.libroService.incrementarExistencia(renta.tituloLibro); // Incrementar la existencia del libro
    this.loadRentas();
}
  
}
