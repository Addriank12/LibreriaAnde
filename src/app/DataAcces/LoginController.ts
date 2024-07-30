import { GenericRepository } from "./GenericDataAcces";

export class LoginController extends GenericRepository{
    protected override collectionName: string = 'auth/login';

}