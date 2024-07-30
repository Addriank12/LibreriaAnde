import { Injectable } from '@angular/core';
import {
  Bytes,
  Firestore,
  addDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  where,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from '@angular/fire/storage';
import { collectionData, query, orderBy } from '@angular/fire/firestore';
import { LibroModel } from '../Domain/LIbroModel';
import { getAuth } from 'firebase/auth';
import { RentaModel } from '../Domain/RentaModel';
import { LibroController } from '../DataAcces/LibroController';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  constructor(
    private libroController: LibroController,
    private storage: Storage
  ) {}

  async addLibro(libro: LibroModel) {
    libro.Imagen = await this.uploadFile(libro);
    await this.libroController.add(libro);
  }

  async uploadFile(libro: LibroModel): Promise<string> {
    const storageRef = ref(this.storage, 'Libros/' + libro.Titulo);
    const result = await uploadBytes(
      storageRef,
      this.convertToBlob(libro.Imagen)
    );
    return getDownloadURL(result.ref);
  }

  private convertToBlob(base64: string) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return blob;
  }

  async getLibros(): Promise<LibroModel[]> {
    return await this.libroController.getAll();
  }

  async deleteLibro(titulo: string) {
    await this.libroController.delete(titulo);
    const imageRef = ref(this.storage, 'Libros/' + titulo);
    await deleteObject(imageRef);
  }

  async updateLibro(libro: LibroModel): Promise<void> {
    try {
      libro.Imagen = await this.uploadFile(libro);
    } catch {
      console.log('No se ha subido la imagen');
    }
    await this.libroController.update(libro);
  }

  async getLibroByTitulo(titulo: string): Promise<LibroModel | undefined> {
    return await this.libroController.getById(titulo);
  }

  async getTotalLibros(): Promise<number> {
    const libros = await this.getLibros();
    return libros.length;
  }

  async incrementarExistencia(titulo: string): Promise<void> {
    const libro = await this.getLibroByTitulo(titulo);
    if (libro) {
      libro.Existencia++;
      await this.updateLibro(libro);
    }
  }
  
}
