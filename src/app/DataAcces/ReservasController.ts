import { GenericRepository } from "./GenericDataAcces";

export class ReservasController extends GenericRepository {
    protected override collectionName: string = 'reservas';
}