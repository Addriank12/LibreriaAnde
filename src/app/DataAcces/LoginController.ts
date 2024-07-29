import { GenericRepository } from "./GenericDataAcces";

export class LoginController extends GenericRepository<any>{
    protected override collectionName: string = 'auth/login';

}