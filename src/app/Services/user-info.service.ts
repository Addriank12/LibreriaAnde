import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import { UserInfo } from '../Domain/UserInfoModel';
import { UsersInfoController } from '../DataAcces/UsersInfoController';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private usersInfoController: UsersInfoController = new UsersInfoController()

  constructor() {       
  }

  async getUserByEmail(email: string): Promise<UserInfo>{ 
    return await this.usersInfoController.getById(email);
  }

  async addUserInfo(userInfo: UserInfo): Promise<boolean> {
    try{
      await this.usersInfoController.add(userInfo);
      return true;
    }
    catch{
      return false;
    }
  }

  async UpdateUserInfo(userInfo: UserInfo): Promise<void> { 
    await this.usersInfoController.update(userInfo);
  }

  async getAllUsers(): Promise<UserInfo[]> {
    return await this.usersInfoController.getAll();
  }

  async getTotalAdmins(): Promise<number> {
    const q = query(collection(this.firestore, 'UsersInfo'), where('isAdmin', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  }

  async getTotalUsuarios(): Promise<number> {
    const querySnapshot = await getDocs(collection(this.firestore, 'UsersInfo'));
    return querySnapshot.size;
  }

}
