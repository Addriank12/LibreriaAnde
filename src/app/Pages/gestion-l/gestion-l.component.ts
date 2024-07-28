import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-gestion-l',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-l.component.html',
  styleUrl: './gestion-l.component.css'
})
export class GestionLComponent {
  selectedLibro: LibroModel = new LibroModel();
  libroSeleccionado: LibroModel = new LibroModel();
  libros: LibroModel[] = [];
  
  
  
  constructor(private libroService: LibroService, private router: Router, authService: AuthService) {
    if (authService.getCurrentUser().isAdmin === false){
      this.router.navigate(['/home']);
    }    
  }

  ngOnInit() { 
    this.libroService.getLibros().then(libros => {
      this.libros = libros.map(libro => libro as LibroModel);
      console.log(this.libros);
    });
  }

  agregarLibro() {
    this.libroService.addLibro(this.selectedLibro);
    alert('Libro agregado con éxito');
    this.ngOnInit();
  }

  seleccionarLibro(libro: LibroModel) {
    this.selectedLibro = libro;
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.selectedLibro.Imagen = (e.target as FileReader).result;
      reader.readAsDataURL(target.files[0]);
    }
  }

  eliminarLibro(libro: LibroModel) {
    this.libroService.deleteLibro(libro.Titulo).then(() => {
      alert('Libro eliminado con éxito');
      this.libros = this.libros.filter(l => l.Titulo !== libro.Titulo);
      if (this.selectedLibro && this.selectedLibro.Titulo === libro.Titulo) {
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



