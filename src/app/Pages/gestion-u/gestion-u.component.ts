import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInfoService } from '../../Services/user-info.service';

@Component({
  selector: 'app-gestion-u',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-u.component.html',
  styleUrl: './gestion-u.component.css'
})
export class GestionUComponent {
  users: any[] = [];

  constructor(private userInfoService: UserInfoService) { }

  async ngOnInit() {
    this.users = await this.userInfoService.getAllUsers();
  }
}
