import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentaModel } from '../../Domain/RentaModel';
import { LibroService } from '../../Services/libro.service';
import { FilterByUsernameforRentPipe } from "../../filter-by-usernamefor-rent.pipe";

@Component({
  selector: 'app-gestion-r',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterByUsernameforRentPipe],
  templateUrl: './gestion-r.component.html',
  styleUrl: './gestion-r.component.css'
})
export class GestionRComponent {
  rentas: RentaModel[] = [];
  searchText: string = '';
  
  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.loadRentas();
  }

  async loadRentas() {
    this.rentas = await this.libroService.getRentas();
  }

  async marcarComoDevuelto(renta: RentaModel) {
    renta.estado = 'devuelto';
    renta.fechaDevolucion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    await this.libroService.updateRenta(renta);
    await this.libroService.incrementarExistencia(renta.tituloLibro); // Incrementar la existencia del libro
    this.loadRentas(); // Recargar la lista de rentas
}
  
}
