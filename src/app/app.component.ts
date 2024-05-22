import { Component } from '@angular/core';
import { HeaderComponent } from './Components/header/header.component';
import { BodyComponent } from './Components/body/body.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LibreriAnde';
}
