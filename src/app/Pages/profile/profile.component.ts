import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { onAuthStateChanged } from '@firebase/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userName: string | null = null;
  userEmail: string | null = null;
  isEditing = false;
  private auth: Auth = inject(Auth);
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userName = user.displayName;
        this.userEmail = user.email;
      }
    });
  }

  saveChanges() {
    // code to save changes goes here
    this.isEditing = false;
  }
}
