import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Domain/UserInfoModel';
import { LoginController } from '../DataAcces/LoginController';
import { UsersInfoController } from '../DataAcces/UsersInfoController';
import { SignUpController } from '../DataAcces/SignUpController';
import { LibroController } from '../DataAcces/LibroController';
import { UserCache } from '../Common/UserCache';

export interface Credential {
  email: string;
  password: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<{ currentUser: UserInfo }>(
    UserCache.getStoredUser()
  );
  public currentUser$ = this.userSubject.asObservable();
  private loginController: LoginController = new LoginController();
  private signUpController: SignUpController = new SignUpController();
  private userInfoController: UsersInfoController = new UsersInfoController();

  constructor() {
    this.initializeCurrentUser();
  }

  // Initialize the current user from local storage
  private initializeCurrentUser(): void {
    const currentUser = UserCache.getStoredUser();    
    this.userSubject.next(currentUser);
  }  

  // Get the current user
  async getCurrentUser(): Promise<UserInfo> {
    return await this.userInfoController.getById(this.userSubject.value.currentUser.email);
  }

  // Update the current user and store it
  setUserName(currentUser: UserInfo): void {    
    UserCache.storeUser(currentUser);
    this.userSubject.next({ currentUser });
  }

  //Add the Login Method
  async LoginUpWithEmailAndPassword(credential: Credential): Promise<string> {
    return await this.loginController.add({ email: credential.email, password: credential.password });   
  }

  // Add the Sign Up Method
  async SignUpWithEmailAndPassword(credential: Credential, userName: String, loginCallback: () => Promise<void>): Promise<void> {
    await this.signUpController.add({ email: credential.email, password: credential.password });
    await loginCallback();
    await this.userInfoController.add({ email: credential.email, userName: userName, isAdmin: false, direccion: 'Pendiente', telefono: '9999999999' });    
  }



  // Add the Logout Method
  async Logout(): Promise<void> {
    this.setUserName({
      email: '',
      userName: '',
      isAdmin: false,
      direccion: '',
      telefono: '',
      profilePic: undefined,
      token: '',
    });
  }
}
