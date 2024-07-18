export class LibroModel{
    Titulo: string;
    Autor: string;
    Imagen: any;
    Genero : any;
    AnioPublicacion : number;
    Descripcion: string;
    Existencia: number;
    Contenido: string;

    constructor(){
        this.Titulo = '';
        this.Autor = '';
        this.Imagen = '';
        this.Genero = '';
        this.AnioPublicacion = 0;
        this.Descripcion = '';
        this.Existencia = 0;
        this.Contenido = '';
    }
}