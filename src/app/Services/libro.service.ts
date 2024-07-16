import { Injectable } from '@angular/core';
import { Bytes, Firestore, addDoc, collection, getDocs, deleteDoc, updateDoc ,doc, where } from '@angular/fire/firestore';
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
    const result = await uploadBytes(storageRef, this.convertToBlob(libro.Imagen));
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

  async UpdateLibro(libro: LibroModel): Promise<void> {
    try{
      libro.Imagen = await this.uploadFile(libro);
    }catch{
      console.log("No se ha subido la imagen");
    }
    const querySnapshot = await getDocs(collection(this.firestore, "Libros"));
    querySnapshot.forEach((doc) => {
      if (doc.data()['Titulo'] === libro.Titulo){
        updateDoc(doc.ref, libro as { [x: string]: any });
      }
    });
  }

  async getLibroByTitulo(titulo: string): Promise<LibroModel | undefined> {
    const q = query(collection(this.firestore, "Libros"), where("Titulo", "==", titulo));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as LibroModel;
    } else {
      return undefined; // O maneja el caso en que no se encuentre el libro
    }
  }

}
