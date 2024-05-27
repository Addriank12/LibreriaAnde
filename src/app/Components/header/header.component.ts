import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authService: AuthService){}

  user: string="";

  ngInit(){
    this.user = this.authService.user.email;
  }

}
