import { Component } from '@angular/core';
import { LibroService } from '../../Services/libro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  libros: any[] = [];

  constructor(private libroService: LibroService) {}

  async ngOnInit() {
    this.libros = await this.libroService.getLibros();
    console.log(this.libros);
  }

}
