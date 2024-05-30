import { Injectable } from '@angular/core';
import { Bytes, Firestore, addDoc, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes, deleteObject } from '@angular/fire/storage';
import { collectionData, query, orderBy } from '@angular/fire/firestore';
import { LibroModel } from '../Domain/LIbroModel';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private firestore: Firestore, private storage: Storage) 
  {
  }

  async addLibro(libro: LibroModel){
    libro.Imagen = await this.uploadFile(libro);
    return await addDoc(collection(this.firestore, "Libros"), Object.assign({}, libro));
  }

  async uploadFile(libro: LibroModel): Promise<string> {
    const storageRef = ref(this.storage, 'Libros/' + libro.Titulo);
    const result = await uploadBytes(storageRef, libro.Imagen);
    return getDownloadURL(result.ref);
  }

  async getLibros() {
    const q = query(collection(this.firestore, "Libros"), orderBy("Titulo"));
    const querySnapshot = await getDocs(q);
    const libros = querySnapshot.docs.map(doc => doc.data());
    return libros;
  }
  
  async deleteLibro(titulo: string) {
  const libroRef = doc(this.firestore, "Libros", titulo);
  await deleteDoc(libroRef);

  const imageRef = ref(this.storage, 'Libros/' + titulo);
  await deleteObject(imageRef);
}
}
