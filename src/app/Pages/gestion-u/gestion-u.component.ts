import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInfoService } from '../../Services/user-info.service';
import { UserInfo } from '../../Domain/UserInfoModel';
import { LoaderComponent } from '../../Components/loader/loader.component';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-gestion-u',
  standalone: true,
  imports: [FormsModule,CommonModule, LoaderComponent],
  templateUrl: './gestion-u.component.html',
  styleUrl: './gestion-u.component.css'
})
export class GestionUComponent {
  users: UserInfo[] = [];
  selectedUser: UserInfo = {
    email: '', userName: '', isAdmin: false, direccion: '', telefono: '', profilePic: '',
    token: ''
  };
  isLoading: boolean = false;
  

  constructor(private userInfoService: UserInfoService, private router: Router, authService: AuthService) {  
    (async () => {
      if ((await authService.getCurrentUser()).isAdmin === false){
        this.router.navigate(['/home']);
      }
    })();
  }

  async ngOnInit() {
    this.users = await this.userInfoService.getAllUsers();
  }

  seleccionarUsuario(usuario: any) {
    this.selectedUser = usuario;
  }

  async updateUser() {
    try { 
      this.isLoading = true;
      await this.userInfoService.UpdateUserInfo(this.selectedUser);
    }
    finally {
      this.isLoading = false;
    }
  }

}