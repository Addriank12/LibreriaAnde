import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, UserCredential, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
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

  private auth: Auth = inject(Auth);
  private authGoogleProvider = new GoogleAuthProvider();

  private userSubject = new BehaviorSubject<{currentUser: UserInfo}>(this.getStoredUser());
  public currentUser$ = this.userSubject.asObservable();


  constructor(private userInfoService: UserInfoService) {
    this.authGoogleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  private getStoredUser(): {currentUser: UserInfo} {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : {currentUser: {email: '', userName: '', isAdmin: false}};
  }

  private storeUser(user: UserInfo): void {
    localStorage.setItem('currentUser', JSON.stringify({currentUser: user}));
  }

  setUserName(currentUser: UserInfo){
    this.userSubject.next({currentUser});
    this.storeUser(currentUser);
  }

  getCurrentUser(): UserInfo{
    return this.userSubject.value.currentUser;
  }

  readonly authState$ = authState(this.auth);

  async SingUpWithEmailAndPassword(credential: Credential, userName: string): Promise<UserCredential>{
    if (credential.password != credential.passwordConfirm){
      throw new Error('Las contraseñas no coinciden');
    }
    let result = await createUserWithEmailAndPassword(this.auth, credential.email, credential.password);
    await this.userInfoService.addUserInfo({email: credential.email, userName: userName, isAdmin: false, direccion: '', telefono: '', profilePic: ''});
    return result;
  }

  LoginUpWithEmailAndPassword(credential: Credential){
    return signInWithEmailAndPassword(this.auth, credential.email, credential.password);
  }

  async LoginWithGoogle(){
    let result = await signInWithPopup(this.auth, this.authGoogleProvider);
    if (result.user === null){
      throw new Error('Error al autenticar con Google');
    }

    let user = await this.userInfoService.getUserByEmail(result.user.email as string);
    if (user === undefined){
      await this.userInfoService.addUserInfo({email: result.user.email as string, userName: result.user.displayName as string, isAdmin: false, direccion: '', telefono: '', profilePic: ''});
    }
    this.setUserName(await this.userInfoService.getUserByEmail(result.user.email as string));
  }

  async Logout() {
    try {
      await signOut(this.auth);
      this.setUserName({email: '', userName: '', isAdmin: false, direccion: '', telefono: '',  profilePic: ''});
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
  
}
