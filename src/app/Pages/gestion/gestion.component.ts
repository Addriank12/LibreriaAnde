import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { LibroService } from '../../Services/libro.service';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  selectedLibro: LibroModel = new LibroModel();

  constructor(private libroService: LibroService) {    

  }

  agregarLibro() {
    this.libroService.addLibro(this.selectedLibro);
  }
}
