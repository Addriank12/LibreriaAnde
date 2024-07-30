import { GenericRepository } from "./GenericDataAcces";

export class LibroController extends GenericRepository<any>{
    protected override collectionName: string = 'userInfo';

}