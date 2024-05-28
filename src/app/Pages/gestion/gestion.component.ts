import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';


@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  nombre: string = '';
  autor: string = '';
  genero: string = '';
  fecha: string = '';
  imagen: string = '';

  constructor() {
    const firebaseConfig = {
      apiKey: "TU_API_KEY",
      authDomain: "TU_AUTH_DOMAIN",
      projectId: "TU_PROJECT_ID",
      storageBucket: "TU_STORAGE_BUCKET",
      messagingSenderId: "TU_MESSAGING_SENDER_ID",
      appId: "TU_APP_ID"
    };

    //firebase.initializeApp(firebaseConfig);
  }

  agregarLibro() {
    // Guardar el nuevo libro en Firebase
    //firebase.database().ref('libros').push
    ({
      nombre: this.nombre,
      autor: this.autor,
      genero: this.genero,
      fecha: this.fecha,
      imagen: this.imagen
    });

    // Limpiar el formulario después de agregar el libro
    this.nombre = '';
    this.autor = '';
    this.genero = '';
    this.fecha = '';
    this.imagen = '';
  }
}
