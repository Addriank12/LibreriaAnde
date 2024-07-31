import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../Services/user-info.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserInfo } from '../../Domain/UserInfoModel';
import { UserCache } from '../../Common/UserCache';
import { RentaService } from '../../Services/renta.service';
import { ReservaModel } from '../../Domain/ReservaModel';

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
  mostrarMisReservas: boolean = false;
  private sub: Subscription = new Subscription();

  constructor(
    public authService: AuthService,    
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

  async ngOnInit() {
    this.sub = this.authService.currentUser$.subscribe({
      next: async (user) => {
        try {
          this.currentUser = user.currentUser;
          if (this.currentUser.email === '' && this.router.url !== '/home') {
            this.router.navigate(['/home']);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      },
    });    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async logout() {
    await this.authService.Logout();
  }
}
