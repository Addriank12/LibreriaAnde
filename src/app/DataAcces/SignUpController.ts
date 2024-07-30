import { GenericRepository } from "./GenericDataAcces";

export class SignUpController extends GenericRepository{
    protected override collectionName: string = 'auth/register';

}