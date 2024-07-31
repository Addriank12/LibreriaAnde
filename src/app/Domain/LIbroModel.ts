export class LibroModel {
    titulo: string;
    autor: string;
    imagen: any;
    genero: any;
    anioPublicacion: number | null;
    existencias: number | null;
    contenido: string;

    constructor() {
        this.titulo = '';
        this.autor = '';
        this.imagen = '';
        this.genero = '';
        this.anioPublicacion = null;
        this.existencias = null;
        this.contenido = '';
    }
}