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
  usuario: any; // Declare the 'usuario' property

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

  rentarLibro(): void {
    if (this.libro) {
      this.libroService.rentarLibro(this.libro.Titulo, this.nombre, this.fecha).then(() => {
        alert('Libro rentado con éxito');
        // Redirigir o hacer algo después de la renta
      });
    }
  }
}
