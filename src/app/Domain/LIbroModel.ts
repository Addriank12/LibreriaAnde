export class LibroModel{
    Titulo: string;
    Autor: string;
    Precio: number;
    Imagen: any;
    Contenido: string;

    constructor(){
        this.Titulo = "";
        this.Autor = "";
        this.Precio = 0;
        this.Imagen = null;
        this.Contenido = "";
    }
}