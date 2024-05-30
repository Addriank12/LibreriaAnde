import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {
  selectedLibro: LibroModel = new LibroModel();
  libroSeleccionado: LibroModel = new LibroModel();
  libros: LibroModel[] = [];
  
  
  constructor(private libroService: LibroService, private router: Router, private authService: AuthService) {
    if (authService.getCurrentUser().isAdmin === false){
      //this.router.navigate(['/home']);
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
      this.libros = this.libros.filter(l => l.Titulo !== libro.Titulo);
      if (this.selectedLibro && this.selectedLibro.Titulo === libro.Titulo) {
        this.selectedLibro = new LibroModel();
      }
    });
  }

  updateLibro() {
    this.libroService.UpdateLibro(this.selectedLibro);
  }
}
