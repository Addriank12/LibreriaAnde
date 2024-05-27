import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, Credential } from '../../Services/auth.service';
import { HeaderComponent } from '../../Components/header/header.component';


@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  loginMode:boolean = true  ;
  credential: Credential = {email: "", password: "", passwordConfirm: ""}
  error: string = "";

  constructor(private asuthService: AuthService){}

  async SingUp() {
    try{
      await this.asuthService.SingUpWithEmailAndPassword(this.credential);
      this.asuthService.user.email = this.credential.email;
    }
    catch(error: any){
      this.error = error.toString();
    }
  }

  async login() {
    try{
      await this.asuthService.LoginUpWithEmailAndPassword(this.credential);
      this.asuthService.user.email = this.credential.email;
    }
    catch(error: any){
      this.error = error.toString();
    }
  }

  changeMode(){
    this.loginMode = !this.loginMode;
  }
  
}
