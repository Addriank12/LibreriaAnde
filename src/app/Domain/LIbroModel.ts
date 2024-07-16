export class LibroModel{
    Titulo: string;
    Autor: string;
    Imagen: any;
    Genero : any;
    AnioPublicacion : any;
    Descripcion: string;
    Existencia: number;
    Contenido: string;

    constructor(){
        this.Titulo = '';
        this.Autor = '';
        this.Imagen = '';
        this.Genero = '';
        this.AnioPublicacion = '';
        this.Descripcion = '';
        this.Existencia = 0;
        this.Contenido = '';
    }
}