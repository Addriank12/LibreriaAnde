import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../Services/user-info.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserInfo } from '../../Domain/UserInfoModel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser: UserInfo= {email: '', userName: '', isAdmin: false};
  private sub: Subscription = new Subscription;

  constructor(public authService: AuthService, private userInfoService: UserInfoService){}

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(async user => {
      const currentUser = await this.userInfoService.getUserByEmail(user.currentUser.email);
      this.currentUser = currentUser; // Add null check here
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
  }
}
