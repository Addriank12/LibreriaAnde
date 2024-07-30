import { Component, OnInit } from '@angular/core';
import { LibroModel } from '../../Domain/LIbroModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LibroService } from '../../Services/libro.service';
import { UserInfoService } from '../../Services/user-info.service';


@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit {

  selectedLibro: LibroModel = new LibroModel();
  libroSeleccionado: LibroModel = new LibroModel();
  libros: LibroModel[] = [];
  
  
  constructor(private router: Router, private authService: AuthService, private userinfoService: UserInfoService) {
      (async () => {
        if ((await authService.getCurrentUser()).isAdmin === false){
          this.router.navigate(['/home']);
        }
      })();
  }
  nombreUsuario: string = '';
  totalAdmins: number = 0;
  totalLibros: number = 0;
  totalUsuarios: number = 0;

  async ngOnInit(): Promise<void> {
    this.nombreUsuario = (await this.authService.getCurrentUser()).userName;

   // this.userinfoService.getTotalAdmins().then(total => {
   //   this.totalAdmins = total;
   // });
//
   // this.libroService.getTotalLibros().then(total => {
   //   this.totalLibros = total;
   // });
//
   // this.userinfoService.getTotalUsuarios().then(total => {
   //   this.totalUsuarios = total;
   // });
  }
}