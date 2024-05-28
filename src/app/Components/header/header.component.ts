import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../Services/user-info.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userEmail: string = "";
  private sub: Subscription = new Subscription;

  constructor(public authService: AuthService, private userInfoService: UserInfoService){}

  ngOnInit() {
    this.sub = this.authService.user$.subscribe(async user => {
      const email = await this.userInfoService.getUserByEmail(user.email);
      this.userEmail = email || ""; // Add null check here
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
  }
}
