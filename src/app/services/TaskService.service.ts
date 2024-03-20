import { Injectable } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private coleccion = 'Tasks'
  constructor(private firestore: AngularFirestore) { }

  listarTasks$(user: string): Observable<any> {
    return this.firestore
      .collection(this.coleccion, (ref) =>
        ref.where('user', '==', user)
          .where('estado', 'in', [1, 2])
      )
      .snapshotChanges()
      .pipe(
        map((result) => {
          return result.map((element) => ({
            id: element.payload.doc.id,
            nombre: element.payload.doc.data()['nombre'],
            estado: element.payload.doc.data()['estado'],
          }));
        })
      );
  }

  listarTasksFinishWithLimit$(user: string): Observable<any> {
    return this.firestore
      .collection(this.coleccion, (ref) =>
        ref.where('user', '==', user)
          .where('estado', '==', 3)
          .limit(10).orderBy('fechaFin', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((result) => {
          return result.map((element) => ({
            id: element.payload.doc.id,
            nombre: element.payload.doc.data()['nombre'],
            estado: element.payload.doc.data()['estado'],
          }));
        })
      );
  }

  listarTasksFinish$(user: string): Observable<any> {
    return this.firestore
      .collection(this.coleccion, (ref) =>
        ref.where('user', '==', user)
          .where('estado', '==', 3)
          .orderBy('fechaFin', 'desc')
      )
      .snapshotChanges()
      .pipe(
        map((result) => {
          return result.map((element) => {
            const data = element.payload.doc.data();
            const fechaInicio = data['fechaInicio'] ? (data['fechaInicio'] as Timestamp).toDate() : null;
            const fechaFin = data['fechaFin'] ? (data['fechaFin'] as Timestamp).toDate() : null;
            return {
              id: element.payload.doc.id,
              nombre: data['nombre'],
              estado: data['estado'],
              fechaInicio: fechaInicio,
              fechaFin: fechaFin,
            }
          });
        })
      );
  }

  listarAllTasks$(user: string): Observable<any> {
    return this.firestore
      .collection(this.coleccion, (ref) =>
        ref.where('user', '==', user)
      )
      .snapshotChanges()
      .pipe(
        map((result) => {
          return result.map((element) => {
            const data = element.payload.doc.data();
            const fechaInicio = data['fechaInicio'] ? (data['fechaInicio'] as Timestamp).toDate() : null;
            const fechaFin = data['fechaFin'] ? (data['fechaFin'] as Timestamp).toDate() : null;
            return {
              id: element.payload.doc.id,
              nombre: data['nombre'],
              estado: data['estado'],
              fechaInicio: fechaInicio,
              fechaFin: fechaFin,
            }
          });
        })
      );
  }

  async crea_edita_Task$(
    accion: number,
    datos: any,
    id: string
  ): Promise<any> {
    try {
      if (accion == 1) {
        return this.firestore.collection(this.coleccion).add(datos);
      } else {
        return this.firestore
          .collection(this.coleccion)
          .doc(id)
          .set(datos, { merge: true });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async elimina_Task$(
    id: string
  ): Promise<any> {
    try {
      return this.firestore
        .collection(this.coleccion)
        .doc(id)
        .delete();

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
