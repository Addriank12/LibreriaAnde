import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FilterByTitlePipe } from "../../filter-by-title.pipe";


@Component({
  selector: 'app-gestion-l',
  standalone: true,
  imports: [FormsModule, CommonModule, FilterByTitlePipe],
  templateUrl: './gestion-l.component.html',
  styleUrl: './gestion-l.component.css'
})
export class GestionLComponent {
  selectedLibro: LibroModel = new LibroModel();
  libroSeleccionado: LibroModel = new LibroModel();
  libros: LibroModel[] = [];
  searchText: string = '';
  mostrarFormulario: boolean = false;

  constructor(
      private router: Router, 
      private route: ActivatedRoute,
      private libroService: LibroService,
      authService: AuthService) {

    }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      const tituloLibro = params['titulo'];
      if (tituloLibro) {
        this.libroService.getLibroByTitulo(tituloLibro).then(libro => {
          this.selectedLibro = libro as LibroModel;
        });
      }
    });
    this.libroService.getLibros().then(libros => {
      this.libros = libros.map(libro => libro as LibroModel);
      console.log(this.libros);
    });
  }

  async agregarLibro() {
    await this.libroService.addLibro(this.selectedLibro);
    alert('Libro agregado con éxito');
    this.ngOnInit();
  }

  seleccionarLibro(libro: LibroModel) {
    this.selectedLibro = libro;
    this.mostrarFormulario = true;
  }


  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.selectedLibro.imagen = (e.target as FileReader).result;
      reader.readAsDataURL(target.files[0]);
    }
  }

  eliminarLibro(libro: LibroModel) {
    this.libroService.deleteLibro(libro.titulo).then(() => {
      alert('Libro eliminado con éxito');
      this.libros = this.libros.filter(l => l.titulo !== libro.titulo);
      if (this.selectedLibro && this.selectedLibro.titulo === libro.titulo) {
        this.selectedLibro = new LibroModel();
      }
    });
  }

  updateLibro(): void {
    this.libroService.updateLibro(this.selectedLibro).then(() => {
      alert('Libro actualizado con éxito');
    });
  }
}



