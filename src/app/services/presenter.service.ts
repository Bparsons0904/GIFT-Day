import { Injectable } from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Presenter } from '../models/presenter';

@Injectable()
export class PresenterService {

  presentersCollection: AngularFirestoreCollection<Presenter>;
  presenterDoc: AngularFirestoreDocument<Presenter>;
  presenters: Observable<Presenter[]>;
  presenter: Observable<Presenter>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.presentersCollection = this.afs.collection('presenters',
      ref => ref.orderBy('name', 'asc'));
   }

  test() {
    console.log("Test method worked");
    
  }
  getPresenters(): Observable<Presenter[]> {
    this.presenters = this.presentersCollection.snapshotChanges()
      .map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Presenter;
          data.id = action.payload.doc.id;
          return data;
        });
      });

    return this.presenters;
  }

  newPresenter(client: Presenter) {
    this.presentersCollection.add(client);
  }

  getPresenter(id: string): Observable<Presenter> {
    this.presenterDoc = this.afs.doc<Presenter>(`presenters/${id}`);
    this.presenter = this.presenterDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Presenter;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.presenter;
  }

  updatePresenter(presenter: Presenter) {
    this.presenterDoc = this.afs.doc(`presenters/${presenter.id}`);
    this.presenterDoc.update(presenter);
  }

  deletePresenter(presenter: Presenter) {
    this.presenterDoc = this.afs.doc(`presenters/${presenter.id}`);
    this.presenterDoc.delete();
  }
}
