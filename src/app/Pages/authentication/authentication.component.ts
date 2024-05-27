import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credential } from '../../Services/auth.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { Router } from '@angular/router';


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

  constructor(private asuthService: AuthService, private router: Router){}

  userName: string = "";

  async SingUp() {
    try{
      this.isLoading = true;
      if (this.userName === "") {
        throw new Error('El nombre de usuario no puede estar vacio')
      }        
      await this.asuthService.SingUpWithEmailAndPassword(this.credential, this.userName);
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
    try{
      this.isLoading = true;
      await this.asuthService.LoginUpWithEmailAndPassword(this.credential);
      this.asuthService.setUserName(this.credential.email);
      // Navigate to home page
      this.router.navigate(['/home']);


    }
    catch(error: any){
      this.error = error.toString();
    }
    finally{
      this.isLoading=false;
    }
  }

  changeMode(){
    this.loginMode = !this.loginMode;
  }
  
}
