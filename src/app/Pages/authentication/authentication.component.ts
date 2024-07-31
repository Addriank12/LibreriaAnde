import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credential } from '../../Services/auth.service';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { Router } from '@angular/router';
import { UserInfo } from '../../Domain/UserInfoModel';
import { RentaService } from '../../Services/renta.service';
import { UserInfoService } from '../../Services/user-info.service';
import { ReservaModel } from '../../Domain/ReservaModel';
import { UserCache } from '../../Common/UserCache';


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
  
  constructor(private asuthService: AuthService, private router: Router, private rentaService: RentaService, private userInfoService: UserInfoService){}
  
  ngOnInit(): void {
    this.asuthService.currentUser$.subscribe(async (user) => {
      if (user.currentUser.email) {
        const reservas = await this.rentaService.getReservasUsuario(user.currentUser.email);
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
  
  async SingUp(): Promise<void> {
    try{
      this.isLoading = true;
      if (this.userName === "") {
        throw new Error('El nombre de usuario no puede estar vacio')
      }
      await this.asuthService.SignUpWithEmailAndPassword(this.credential, this.userName, async () => await this.login(this.credential));
      this.error = "";
    }
    catch(error: any){
      this.error = error.toString();
    }
    finally{
      this.isLoading = false;
    }
  }

  async login(credential: Credential) : Promise<void> {
    try {
      this.isLoading = true;
      const token = await this.asuthService.LoginUpWithEmailAndPassword(credential);    
      const user: UserInfo = { email: credential.email, userName: '', isAdmin: false, direccion: '', telefono: '', profilePic: '', token: '' }; ; 
      user.token = token;
      this.asuthService.setUserName(user);
      user.isAdmin = (await this.userInfoService.getUserByEmail(credential.email)).isAdmin;
      this.asuthService.setUserName(user);
      await this.CheckReservas();
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

  proximasDevoluciones: ReservaModel[] = [];

  async CheckReservas(){
    this.proximasDevoluciones = await this.rentaService.getProximasDevoluciones(
      UserCache.getStoredUser().currentUser.email
    );
    if (this.proximasDevoluciones.length > 0) {
      const devolucionesMensaje = this.proximasDevoluciones
        .map(
          (reserva) =>
            `Libro: ${
              reserva.libro.titulo
            }, Fecha de Devolución: ${new Date(
              reserva.fechaDevolucion
            ).toLocaleDateString()}`
        )
        .join('\n');
      alert(`Tienes próximas devoluciones:\n${devolucionesMensaje}`);
    }
  }
  
}
