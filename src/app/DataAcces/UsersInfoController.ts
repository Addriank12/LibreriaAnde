import { GenericRepository } from "./GenericDataAcces";

export class UsersInfoController extends GenericRepository<any>{
    protected override collectionName: string = 'userInfo';

}