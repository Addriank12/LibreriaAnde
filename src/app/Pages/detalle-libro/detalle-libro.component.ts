import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../Services/libro.service';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.css'
})
export class DetalleLibroComponent {
  libro: LibroModel | undefined;
  libros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    const titulo = this.route.snapshot.paramMap.get('titulo');
    if (titulo) {
      this.libroService.getLibroByTitulo(titulo).then(libro => {
        this.libro = libro;
      });
    }
  }
}


