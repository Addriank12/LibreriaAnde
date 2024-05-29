import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { UserInfo } from '../Domain/UserInfoModel';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private firestore: Firestore) {   }

  async getUserByEmail(email: string): Promise<UserInfo>{
    const querySnapshot = await getDocs(collection(this.firestore, "UsersInfo"));
    let result: UserInfo = {email: '', userName: '', isAdmin: false};
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


}
