import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {
  selectedLibro: LibroModel = new LibroModel();
  libros: LibroModel[] = [];
  
  constructor(private libroService: LibroService) {    

  }

  ngOnInit() { // Método que se llama automáticamente cuando se inicializa el componente
    this.libroService.getLibros().then(libros => {
      this.libros = libros.map(libro => libro as LibroModel);
      console.log(this.libros); // Agrega esta línea
    });
  }

  agregarLibro() {
    this.libroService.addLibro(this.selectedLibro);
  }

}
