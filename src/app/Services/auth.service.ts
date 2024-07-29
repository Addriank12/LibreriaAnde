import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../Domain/UserInfoModel';
import { LoginController } from '../DataAcces/LoginController';
import { UsersInfoController } from '../DataAcces/UsersInfoController';
import { SignUpController } from '../DataAcces/SignUpController';

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
    AuthService.getStoredUser()
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
    const currentUser = AuthService.getStoredUser();
    
    this.userSubject.next(currentUser);
  }

  // Retrieve the stored user from local storage
  public static getStoredUser(): { currentUser: UserInfo } {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser
      ? JSON.parse(storedUser)
      : { currentUser: { email: '', userName: '', isAdmin: false } };
  }

  // Store the user in local storage
  private storeUser(user: UserInfo): void {
    localStorage.setItem('currentUser', JSON.stringify({ currentUser: user }));
    console.log(user);
  }

  // Get the current user
  async getCurrentUser(): Promise<UserInfo> {
    return await this.userInfoController.getById(this.userSubject.value.currentUser.email);
  }

  // Update the current user and store it
  setUserName(currentUser: UserInfo): void {
    this.userSubject.next({ currentUser });
    this.storeUser(currentUser);
  }

  //Add the Login Method
  async LoginUpWithEmailAndPassword(credential: Credential): Promise<string> {
    return await this.loginController.add({ email: credential.email, password: credential.password });
  }

  // Add the Sign Up Method
  async SingUpWithEmailAndPassword(credential: Credential): Promise<void> {
    await this.signUpController.add({ email: credential.email, password: credential.password });
    await this.userInfoController.add({ email: credential.email, userName: 'Pendiente', isAdmin: false, direccion: 'Pendiente', telefono: '9999999999' });
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
