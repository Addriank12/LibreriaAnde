import { GenericRepository } from "./GenericDataAcces";

export class SignUpController extends GenericRepository<any>{
    protected override collectionName: string = 'auth/register';

}