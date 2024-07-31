import { Component } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { BodyComponent } from './Components/body/body.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UserInfoService } from './Services/user-info.service';
import { RentaService } from './Services/renta.service';
import { ReservaModel } from './Domain/ReservaModel';
import { UserCache } from './Common/UserCache';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'LibreriAnde';

  constructor(
    private rentaService: RentaService
  ) {}

  proximasDevoluciones: ReservaModel[] = [];

  async ngOnInit() {
    this.proximasDevoluciones = await this.rentaService.getProximasDevoluciones(
      UserCache.getStoredUser().currentUser.email
    );
    if (this.proximasDevoluciones.length > 0) {
      const devolucionesMensaje = this.proximasDevoluciones
        .map(
          (reserva) =>
            `Libro: ${
              reserva.libro.titulo
            }, Fecha de Devolución: ${new Date(
              reserva.fechaDevolucion
            ).toLocaleDateString()}`
        )
        .join('\n');
      alert(`Tienes próximas devoluciones:\n${devolucionesMensaje}`);
    }
  }
}
