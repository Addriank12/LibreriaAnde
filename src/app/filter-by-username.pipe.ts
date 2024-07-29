import { Pipe, PipeTransform } from '@angular/core';
import { UserInfo } from './Domain/UserInfoModel';

@Pipe({
  name: 'filterByUsername',
  standalone: true
})
export class FilterByUsernamePipe implements PipeTransform {

  transform(users: UserInfo[], searchText: string): UserInfo[] {
    if (!users || !searchText) {
      return users;
    }
    return users.filter(user =>
      user.userName.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
}
