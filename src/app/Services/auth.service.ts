import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { UserInfo } from '../Domain/UserInfoModel';

export interface Credential{
  email: string;
  password: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userInfoService: UserInfoService) { }

 
  private auth: Auth = inject(Auth);
  private userSubject = new BehaviorSubject<{email: string}>({email: ''});
  public user$ = this.userSubject.asObservable();

  setUserName(email: string){
    this.userSubject.next({email});
  }  

  readonly authState$ = authState(this.auth);

  async SingUpWithEmailAndPassword(credential: Credential, userName: string): Promise<UserCredential>{
    if (credential.password != credential.passwordConfirm){
      throw new Error('Las contraseñas no coinciden');
    }
    let result = await createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
    await this.userInfoService.addUserInfo({email: credential.email, userName: userName});
    return result;
  }

  LoginUpWithEmailAndPassword(credential: Credential){
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

}
