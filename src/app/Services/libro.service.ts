import { Injectable } from '@angular/core';
import { Bytes, Firestore, addDoc, collection, getDocs, setDoc, deleteDoc, updateDoc ,doc, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes, deleteObject } from '@angular/fire/storage';
import { collectionData, query, orderBy } from '@angular/fire/firestore';
import { LibroModel } from '../Domain/LIbroModel';
import { getAuth } from "firebase/auth";
import { RentaModel } from '../Domain/RentaModel';

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

  async rentarLibro(titulo: string, fechaRenta: string): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const nombre = user.displayName || "Usuario Desconocido";
      const q = query(collection(this.firestore, "Libros"), where("Titulo", "==", titulo));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const libroDoc = querySnapshot.docs[0];
        const libro = libroDoc.data() as LibroModel;
        if (libro.Existencia > 0) {
          libro.Existencia -= 1;
          await updateDoc(libroDoc.ref, { Existencia: libro.Existencia });
  
          // Convertir la fecha de renta a un objeto Date
          const fechaRentaDate = new Date(fechaRenta);
          // Sumar 14 días para la fecha de devolución
          const fechaDevolucion = new Date(fechaRentaDate.getTime() + 14 * 24 * 60 * 60 * 1000);
          // Formatear la fecha de devolución a una cadena en formato YYYY-MM-DD
          const fechaDevolucionStr = fechaDevolucion.toISOString().split('T')[0];
  
          // Generar un nuevo documento en la colección "Reservas" con un ID único
          const reservaRef = doc(collection(this.firestore, "Reservas"));
          const reserva = {
            id: reservaRef.id, // Usar el ID generado
            tituloLibro: titulo,
            userName: nombre,
            fechaRenta: fechaRenta,
            fechaDevolucion: fechaDevolucionStr,
            estado: 'pendiente',
          };
          await setDoc(reservaRef, reserva);
        } else {
          throw new Error('No hay existencias disponibles');
        }
      }
    } else {
      throw new Error('Usuario no logueado');
    }
  }

  async getRentas(): Promise<RentaModel[]> {
    const rentas: RentaModel[] = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'Reservas'));
    querySnapshot.forEach((doc) => {
      const renta = doc.data() as RentaModel;
      console.log('Renta obtenida:', renta); // Log para depurar
      rentas.push(renta);
    });
    return rentas;
  }

  
  async updateRenta(renta: RentaModel): Promise<void> {
    const rentaDocRef = doc(this.firestore, `Reservas/${renta.id}`);
    await updateDoc(rentaDocRef, { estado: renta.estado, fechaDevolucion: renta.fechaDevolucion });
  }

}
