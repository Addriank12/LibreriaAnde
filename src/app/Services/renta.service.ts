import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { RentaModel } from '../Domain/RentaModel';

@Injectable({
  providedIn: 'root'
})
export class RentaService {
  constructor(private firestore: Firestore) { }

  async addRenta(renta: RentaModel) {
    const docRef = await addDoc(collection(this.firestore, 'Rentas'), Object.assign({}, renta));
    renta.id = docRef.id; // Si necesitas guardar el ID generado
  }

  async getRentas(): Promise<RentaModel[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'Rentas'));
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as RentaModel;
      data.id = doc.id;
      return data;
    });
  }

  async updateRenta(renta: RentaModel) {
    if (renta.id) {
      const rentaDocRef = doc(this.firestore, 'Rentas', renta.id.toString());
      await updateDoc(rentaDocRef, Object.assign({}, renta) as { [x: string]: any });
    }
  }
}
