import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [FormsModule, CommonModule],
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


