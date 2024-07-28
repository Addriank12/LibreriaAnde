import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibroModel } from '../../Domain/LIbroModel';
import { LibroService } from '../../Services/libro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-rentar-libro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './rentar-libro.component.html',
  styleUrl: './rentar-libro.component.css'
})
export class RentarLibroComponent {
  libro: LibroModel | undefined;
  nombre: string = '';
  fecha: string = '';
  libros: any[] = [];
  loading: boolean = true;
  usuario: any; 
  fechaEntrega: string = '';
  diasRestantes: number = 0;
  searchQuery: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const titulo = this.route.snapshot.paramMap.get('titulo');
    if (titulo) {
      this.libroService.getLibroByTitulo(titulo).then(libro => {
        this.libro = libro;
        this.usuario = this.authService.getCurrentUser(); // Obtiene el usuario actual
        this.loading = false; // Datos cargados
      });
    } else {
      this.loading = false; // Si no hay título, también dejamos de cargar
    }
  }

  calcularFechaEntrega(): void {
    const fechaSeleccionada = new Date(this.fecha);
    let diasSumados = 0;
    while (diasSumados < 5) {
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Sumar un día
      // Verificar si el día es laboral (lunes a viernes)
      if (fechaSeleccionada.getDay() !== 0 && fechaSeleccionada.getDay() !== 6) {
        diasSumados++;
      }
    }
    this.fechaEntrega = fechaSeleccionada.toISOString().split('T')[0]; // Formatear fecha para mostrar
    this.diasRestantes = 5; // En este contexto, siempre serán 5 días laborales
  }

  rentarLibro(): void {
    // Validación para asegurarse de que todos los campos necesarios están llenos
    if (!this.fecha) {
      alert('Por favor, complete todos los campos requeridos.');
      return; // Detiene la ejecución si la fecha no está llena
    }

    const fechaSeleccionada = new Date(this.fecha);
    const fechaActual = new Date();
    // Establecer la hora de la fecha actual a 00:00:00 para comparar solo la fecha
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < fechaActual) {
      alert('La fecha de renta no puede ser menor a la fecha actual.');
      return; // Detiene la ejecución si la fecha es menor a la actual
    }
  
    if (this.libro && this.libro.Titulo) { // Asegúrate de que el libro y su título existan
      this.libroService.rentarLibro(this.libro.Titulo, this.fecha).then(() => {
        alert('Libro rentado con éxito');
        // Redirigir o hacer algo después de la renta
      });
    } else {
      alert('No se ha seleccionado un libro');
      // Manejar el caso en que no se haya seleccionado un libro
    }
  }
}
