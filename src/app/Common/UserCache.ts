import { UserInfo } from "../Domain/UserInfoModel";

export class UserCache {    

    // Retrieve the stored user from local storage
  public static getStoredUser(): { currentUser: UserInfo } {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser
      ? JSON.parse(storedUser)
      : { currentUser: { email: '', userName: '', isAdmin: false } };
  }

  // Store the user in local storage
  public static storeUser(user: UserInfo): void {
    localStorage.setItem('currentUser', JSON.stringify({ currentUser: user }));
    console.log(user);
  }



}