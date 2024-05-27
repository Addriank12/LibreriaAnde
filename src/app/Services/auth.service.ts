import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

export interface Credential{
  email: string;
  password: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private auth: Auth = inject(Auth);
  public user: Credential = {email: "", password: "", passwordConfirm: ""};
  readonly authState$ = authState(this.auth);


  SingUpWithEmailAndPassword(credential: Credential): Promise<UserCredential>{
    if (credential.password != credential.passwordConfirm){
      throw new Error('Las contraseñas no coinciden');
    }
    return createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

  LoginUpWithEmailAndPassword(credential: Credential){
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

}
