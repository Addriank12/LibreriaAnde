import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  libros: any[] = [];

  constructor(private libroService: LibroService) {}

  async ngOnInit() {
    this.libros = await this.libroService.getLibros();
    console.log(this.libros);
  }
  
}
