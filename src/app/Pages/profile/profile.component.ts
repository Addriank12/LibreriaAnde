import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../Domain/UserInfoModel';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../Services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  isEditing = false;
  private sub: Subscription = new Subscription;
  userInfo : UserInfo = {
    email: '', userName: '', isAdmin: false, direccion: '', telefono: '', profilePic: '',
    token: ''
  };

  constructor(private authService: AuthService, private userInfoService: UserInfoService, private router: Router) { 
    (async () => {
      if ((await authService.getCurrentUser()).email === ""){
        this.router.navigate(['/home']);
      }
    })();
  }

  ngOnInit(){
    this.sub = this.authService.currentUser$.subscribe(async user => {
      this.userInfo = await this.userInfoService.getUserByEmail(user.currentUser.email);
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  } 

  saveChanges() {
    this.isEditing = false;
    this.userInfoService.UpdateUserInfo(this.userInfo);
    this.authService.setUserName(this.userInfo);
    this.router.navigate(['/home']);
  }
}
