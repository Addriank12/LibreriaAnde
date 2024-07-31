import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibroModel } from '../../Domain/LIbroModel';
import { LibroService } from '../../Services/libro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { RentaService } from '../../Services/renta.service';
import { UserCache } from '../../Common/UserCache';
import { ReservaModel } from '../../Domain/ReservaModel';
import { UserInfoService } from '../../Services/user-info.service';
import { UserInfo } from '../../Domain/UserInfoModel';

@Component({
  selector: 'app-rentar-libro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './rentar-libro.component.html',
  styleUrls: ['./rentar-libro.component.css'],
})
export class RentarLibroComponent {
  libro: LibroModel | undefined;
  nombre: string = '';
  fecha: Date = new Date();
  libros: any[] = [];
  loading: boolean = true;
  email: string = '';
  fechaEntrega: Date = new Date();
  diasRestantes: number = 0;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private rentaService: RentaService,
    private authService: AuthService,
    private libroService: LibroService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    const titulo = this.route.snapshot.paramMap.get('titulo');
    try {
      if (titulo) {
        this.libroService
          .getLibroByTitulo(titulo)
          .then((libro) => {
            this.libro = libro;
            this.email = UserCache.getStoredUser().currentUser.email;
            this.loading = false;
          })
          .catch((error) => {
            console.error('Error fetching libro:', error);
            this.loading = false;
          });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  calcularFechaEntrega(): void {
    const fechaSeleccionada = new Date(this.fecha);
    let diasSumados = 0;
    while (diasSumados < 5) {
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Sumar un día
      // Verificar si el día es laboral (lunes a viernes)
      if (
        fechaSeleccionada.getDay() !== 0 &&
        fechaSeleccionada.getDay() !== 6
      ) {
        diasSumados++;
      }
    }
    this.fechaEntrega = fechaSeleccionada; // Formatear fecha para mostrar
    this.diasRestantes = 5; // En este contexto, siempre serán 5 días laborales
  }

  async rentarLibro(): Promise<void> {
    // Validación para asegurarse de que todos los campos necesarios están llenos
    if (!this.fecha) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    const fechaSeleccionada = new Date(this.fecha);
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Sumar un día
    const fechaActual = new Date();
    // Establecer la hora de la fecha actual a 00:00:00 para comparar solo la fecha
    fechaActual.setHours(0, 0, 0, 0);
    fechaSeleccionada.setHours(23, 59, 59, 0);
    if (fechaSeleccionada < fechaActual) {
      alert('La fecha de renta no puede ser menor a la fecha actual.');
      return; // Detiene la ejecución si la fecha es menor a la actual
    }
    if (this.libro && this.libro.titulo) {
      // Asegúrate de que el libro y su título existan
      const user: UserInfo = await this.userInfoService.getUserByEmail(
        this.email
      );
      const reserva: ReservaModel = {
        libro: this.libro,
        user: user,
        fechaRenta: new Date(), // Formatear fecha para mostrar
        fechaDevolucion: this.fechaEntrega,
        estado: 'pendiente',
        id: '',
      };
      this.rentaService
        .rentarLibro(reserva)
        .then(() => {
          const libro = this.libro;
          if (libro) {
            libro.existencias--;
            this.libroService.updateLibro(libro);
          }          
          alert('Libro rentado exitosamente');
        })
        .catch((error) => {
          console.error('Error renting book:', error);
          alert('Hubo un error al rentar el libro');
        });
    } else {
      alert('No se ha seleccionado un libro');
    }
  }
}
