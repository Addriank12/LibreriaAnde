import { GenericRepository } from "./GenericDataAcces";

export class UsersInfoController extends GenericRepository{
    protected override collectionName: string = 'userInfo';

}