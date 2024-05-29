import { Injectable, inject } from '@angular/core';
import { Auth, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
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

  private userSubject = new BehaviorSubject<{currentUser: UserInfo}>({currentUser: {email: '', userName: '', isAdmin: false}});
  public currentUser$ = this.userSubject.asObservable();

  setUserName(currentUser: UserInfo){
    this.userSubject.next({currentUser});
  }  

  readonly authState$ = authState(this.auth);

  async SingUpWithEmailAndPassword(credential: Credential, userName: string): Promise<UserCredential>{
    if (credential.password != credential.passwordConfirm){
      throw new Error('Las contraseñas no coinciden');
    }
    let result = await createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
    await this.userInfoService.addUserInfo({email: credential.email, userName: userName, isAdmin: false});
    return result;
  }

  LoginUpWithEmailAndPassword(credential: Credential){
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

  async logout() {
    await signOut(this.auth);
  }
  
}
