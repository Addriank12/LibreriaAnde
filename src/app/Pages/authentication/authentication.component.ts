import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credential } from '../../Services/auth.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { Router } from '@angular/router';
import { UserInfoService } from '../../Services/user-info.service';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule, LoaderComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  loginMode:boolean = true  ;
  credential: Credential = {email: "", password: "", passwordConfirm: ""}
  error: string = "";
  isLoading: boolean = false;

  constructor(private asuthService: AuthService, private router: Router, private userInfoService: UserInfoService){}

  userName: string = "";

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
  }
  
}
