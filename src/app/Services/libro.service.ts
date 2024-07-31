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

  public async getLibros(): Promise<LibroModel[]> {    
    try {
      return await this.libroController.getAll();
    } catch (error) {
      console.error('Error fetching libros:', error);
      throw error;
    }
  }

  public async addLibro(libro: LibroModel): Promise<void> {
    try {
      libro.imagen = await this.uploadFile(libro);
      await this.libroController.add(libro);
    } catch (error) {
      console.error('Error adding libro:', error);
      throw error;
    }
  }

  public async deleteLibro(Titulo: any): Promise<void> {
    try {
      await this.libroController.delete(Titulo);
    } catch (error) {
      console.error('Error deleting libro:', error);
      throw error;
    }
  }

  public async updateLibro(selectedLibro: LibroModel): Promise<void> {
    try {
      selectedLibro.imagen = await this.uploadFile(selectedLibro);      
    } catch (error) {
    }
    await this.libroController.update(selectedLibro);
  }

  public async getLibroByTitulo(titulo: string): Promise<LibroModel> {
    return await this.libroController.getById(titulo);
  }

  public async getTotalLibros(): Promise<number> {
    return await this.getLibros().then(libros => libros.length);
  }  

  private async uploadFile(libro: LibroModel): Promise<string> {
    const storageRef = ref(this.storage, 'Libros/' + libro.titulo);
    const result = await uploadBytes(storageRef, this.convertToBlob(libro.imagen));
    return getDownloadURL(result.ref);
  }

  private convertToBlob(base64: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/jpeg' });
  }
}