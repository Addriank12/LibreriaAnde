import { LibroModel } from "../Domain/LIbroModel";
import { GenericRepository } from "./GenericDataAcces";

export class LibroController extends GenericRepository {
    protected override collectionName: string = 'libro';
    

}