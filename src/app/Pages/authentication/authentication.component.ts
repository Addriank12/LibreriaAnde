import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credential } from '../../Services/auth.service';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { Router } from '@angular/router';
import { UserInfoService } from '../../Services/user-info.service';
import { LibroService } from '../../Services/libro.service';
import { RentaModel } from '../../Domain/RentaModel';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule, LoaderComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
  loginMode:boolean = true  ;
  credential: Credential = {email: "", password: "", passwordConfirm: ""}
  error: string = "";
  isLoading: boolean = false;
  userName: string = "";
  
  constructor(private asuthService: AuthService, private router: Router, private userInfoService: UserInfoService,private libroService: LibroService){}
  
  ngOnInit(): void {
    this.asuthService.currentUser$.subscribe(async (user) => {
      if (user.currentUser.email) {
        const reservas = await this.libroService.getReservasUsuario(user.currentUser.email);
        if (reservas.length > 0) {
          const hoy = new Date();
          reservas.forEach((reserva) => {
            const fechaDevolucion = new Date(reserva.fechaDevolucion ?? "");
            const diasRestantes = Math.ceil((fechaDevolucion.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
            if (diasRestantes > 0) {
              alert(`Tienes una reserva pendiente. Te quedan ${diasRestantes} días para devolver el libro.`);
            } else {
              alert(`Tienes una reserva pendiente. La fecha de devolución ya ha pasado.`);
            }
          });
        }
      }
    });
  }
  
  async SingUp() {
    try{
      this.isLoading = true;
      if (this.userName === "") {
        throw new Error('El nombre de usuario no puede estar vacio')
      }        
      await this.asuthService.SingUpWithEmailAndPassword(this.credential, this.userName);
      this.error = "";
      this.login;
    }
    catch(error: any){
      this.error = error.toString();
    }
    finally{
      this.isLoading = false;
    }
  }

  async LoginWithGoogle() {
    await this.asuthService.LoginWithGoogle();
    this.router.navigate(['/home']);
  }

  async login() {
    try {
      this.isLoading = true;
      await this.asuthService.LoginUpWithEmailAndPassword(this.credential);
      this.asuthService.setUserName(await this.userInfoService.getUserByEmail(this.credential.email));
      // Navigate to home page
      this.router.navigate(['/home']);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.error = 'El correo electrónico no es válido.';
          break;
        case 'auth/user-disabled':
          this.error = 'Este usuario ha sido deshabilitado.';
          break;
        case 'auth/user-not-found':
          this.error = 'Usuario no encontrado.';
          break;
        case 'auth/wrong-password':
          this.error = 'Contraseña incorrecta.';
          break;
        default:
          this.error = 'Ocurrió un error al iniciar sesión.';
      }
    } finally {
      this.isLoading = false;
    }
  }

  changeMode(){
    this.loginMode = !this.loginMode;
    this.error = "";
  }
  
}
