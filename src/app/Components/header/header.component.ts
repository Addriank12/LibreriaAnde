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
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUser: UserInfo = {
    email: '',
    userName: '',
    isAdmin: false,
    direccion: '',
    telefono: '',
    profilePic: '',
    token: '',
  };
  private sub: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {
    document.addEventListener('DOMContentLoaded', function () {
      const menuToggle = document.getElementById('menu-toggle');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');

      if (!menuToggle || !mobileMenu || !menuIcon) {
        return;
      }

      menuToggle.addEventListener('click', function () {
        if (mobileMenu.style.display === 'none') {
          mobileMenu.style.display = 'flex';
          menuIcon.textContent = '✕';
        } else {
          mobileMenu.style.display = 'none';
          menuIcon.textContent = '☰';
        }
      });
    });
  }

  ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe(async (user) => {
      this.currentUser = await this.authService.getCurrentUser();
      if (this.currentUser.email === '') {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async logout() {
    await this.authService.Logout();
  }
}
