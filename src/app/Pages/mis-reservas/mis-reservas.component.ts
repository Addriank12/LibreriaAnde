import { Component } from '@angular/core';
import { ReservaModel } from '../../Domain/ReservaModel';
import { RentaService } from '../../Services/renta.service';
import { AuthService } from '../../Services/auth.service';
import { UserCache } from '../../Common/UserCache';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent {
  reservas: ReservaModel[] = [];
  userId: string = '';

  constructor(private rentaService: RentaService) {}

  async ngOnInit() {
    this.userId = UserCache.getStoredUser().currentUser.email;
    this.reservas = await this.rentaService.getRentasByUser(this.userId);
  }


}
