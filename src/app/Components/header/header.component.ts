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
    private userInfoService: UserInfoService,
    private router: Router,
    private rentaService: RentaService
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
    this.sub = this.authService.currentUser$.subscribe({
      next: async (user) => {
        try {
          this.currentUser = UserCache.getStoredUser().currentUser;
          if (this.currentUser.email === '' && this.router.url !== '/home') {
            this.router.navigate(['/home']);
          }
          else{
            this.mostrarMisReservas = await this.rentaService.usuarioTieneRenta(this.currentUser.email);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      },
      error: (err) => {
        console.error('Error in currentUser$ subscription:', err);
      },
      complete: () => {
        console.log('currentUser$ subscription completed');
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
