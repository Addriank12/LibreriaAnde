import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  ngOnInit() {
    document.body.classList.add('login-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('login-page');
  }


}
