import { Component } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroModel } from '../../Domain/LIbroModel';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  searchCategory: string = '';
  searchTitulo: string = '';
  searchAutor: string = '';
  searchGenero: string = '';
  searchAnioPublicacion: number | null = null;
  searchExistencias: boolean = true;
  libros: LibroModel[] = [];
  isLoading: boolean = false;

  constructor(private libroService: LibroService) {}

  async ngOnInit() {
    await this.performAdvancedSearch();
    this.isLoading = false;
    console.log(this.libros);
  }

  async toggleSearchExistencias() {
    this.searchExistencias = !this.searchExistencias;
    await this.performAdvancedSearch();
  }

  async performAdvancedSearch() {
    console.log('Título:', this.searchTitulo);
    console.log('Autor:', this.searchAutor);
    console.log('Género:', this.searchGenero);
    console.log('Año de Publicación:', this.searchAnioPublicacion);
    console.log('Existencias:', this.searchExistencias);
    
    this.libros = await this.libroService.getLibros();
    
    this.libros = this.libros.filter((libro) => {
      return (
        (!this.searchTitulo || libro.titulo.includes(this.searchTitulo)) &&
        (!this.searchAutor || libro.autor.includes(this.searchAutor)) &&
        (!this.searchGenero || libro.genero.includes(this.searchGenero)) &&
        (!this.searchAnioPublicacion || Number(libro.anioPublicacion) === this.searchAnioPublicacion) &&
        (libro.existencias !== null && (this.searchExistencias ? libro.existencias > 0 : libro.existencias === 0))
      );
    });
  }
}
