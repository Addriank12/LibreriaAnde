export class LibroModel{
    titulo: string;
    autor: string;
    imagen: any;
    genero : any;
    anioPublicacion : number;
    existencias: number;
    contenido: string;

    constructor(){
        this.titulo = '';
        this.autor = '';
        this.imagen = '';
        this.genero = '';
        this.anioPublicacion = 0;
        this.existencias = 0;
        this.contenido = '';
    }


}