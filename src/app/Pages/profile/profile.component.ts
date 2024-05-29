import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { onAuthStateChanged } from '@firebase/auth';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userName: string | null = null;
  userEmail: string | null = null;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    onAuthStateChanged(this.authService.auth, (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;
      }
    });
  }
}
