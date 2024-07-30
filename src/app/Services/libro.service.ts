import { Injectable } from '@angular/core';
import { LibroController } from '../DataAcces/LibroController';
import { LibroModel } from '../Domain/LIbroModel';
import { Storage, getDownloadURL, ref, uploadBytes, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private libroController: LibroController = new LibroController();

  constructor(private storage: Storage) { }

  public async getLibros(): Promise<any[]> {
    
    return await this.libroController.getAll();
  }

  public async addLibro(libro: LibroModel): Promise<void> {
    libro.imagen = await this.uploadFile(libro);
    await this.libroController.add(libro);
  }

  async uploadFile(libro: LibroModel): Promise<string> {
    const storageRef = ref(this.storage, 'Libros/' + libro.titulo);
    const result = await uploadBytes(storageRef, this.convertToBlob(libro.imagen));
    return getDownloadURL(result.ref);
  }

    private convertToBlob(base64: string){
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/jpeg'});
    return blob;
  }


}
