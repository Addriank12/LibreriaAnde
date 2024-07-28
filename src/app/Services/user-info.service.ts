import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import { UserInfo } from '../Domain/UserInfoModel';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {


  constructor(private firestore: Firestore) {   }

  async getUserByEmail(email: string): Promise<UserInfo>{
    const querySnapshot = await getDocs(collection(this.firestore, "UsersInfo"));
    let result: UserInfo = {email: '', userName: '', isAdmin: false, direccion: '', telefono: '', profilePic: ''};
    querySnapshot.forEach((doc) => {
      if (doc.data()['email'] === email){
        result = doc.data() as UserInfo;
      }
    });
    return result;
  }

  async addUserInfo(userInfo: UserInfo): Promise<DocumentReference> {
    return await addDoc(collection(this.firestore, "UsersInfo"), Object.assign({}, userInfo));
  }

  async UpdateUserInfo(userInfo: UserInfo): Promise<void> {
    const querySnapshot = await getDocs(collection(this.firestore, "UsersInfo"));
    querySnapshot.forEach((doc) => {
      if (doc.data()['email'] === userInfo.email){
        updateDoc(doc.ref, userInfo as { [x: string]: any });
      }
    });
  }

  async getAllUsers(): Promise<UserInfo[]> {
    const querySnapshot = await getDocs(collection(this.firestore, "UsersInfo"));
    const users: UserInfo[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserInfo);
    });
    return users;
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
