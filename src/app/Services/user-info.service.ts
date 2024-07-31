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

  async getTotalUsuarios() {
    return this.usersInfoController.getAll().then(users => users.length);

    
  }
  async getTotalAdmins() {
    return this.usersInfoController.getAll().then(users => users.filter((user: { isAdmin: any; }) => user.isAdmin).length);
  }


}
