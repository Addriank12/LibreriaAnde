import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../Domain/UserInfoModel';
import { Subscription } from 'rxjs';

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


  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.sub = this.authService.currentUser$.subscribe(user => {
      this.userInfo = user.currentUser;
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  userInfo : UserInfo = {email: '', userName: '', isAdmin: false};
  
 
  saveChanges() {
    // code to save changes goes here
    this.isEditing = false;
  }
}
