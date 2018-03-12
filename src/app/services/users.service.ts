import { Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Users } from '../models/users';

@Injectable()
export class UsersService {
    // usersCollection: AngularFirestoreCollection<Users>;
    usersDoc: AngularFirestoreDocument<Users>;
    // users: Observable<Users[]>;
    users: Observable<Users>;

    constructor(private afs: AngularFirestore) {
        // this.usersCollection = this.afs.collection('users',
        //     ref => ref.orderBy('lastName', 'asc'));

    }

    // getClients(): Observable<Client[]> {
    //     this.clients = this.clientsCollection.snapshotChanges()
    //         .map(changes => {
    //             return changes.map(action => {
    //                 const data = action.payload.doc.data() as Client;
    //                 data.id = action.payload.doc.id;
    //                 return data;
    //             });
    //         });

    //     return this.clients;
    // }

    // newClient(client: Client) {
    //     this.clientsCollection.add(client);
    // }

    // getClient(id: string): Observable<Client> {
    //     this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    //     this.client = this.clientDoc.snapshotChanges().map(action => {
    //         if (action.payload.exists === false) {
    //             return null;
    //         } else {
    //             const data = action.payload.data() as Client;
    //             data.id = action.payload.id;
    //             return data;
    //         }
    //     });

    //     return this.client;
    // }

    updateUsers(users: Users) {
        this.usersDoc = this.afs.doc(`users/${users.uid}`);
        this.usersDoc.update(users);
    }

    validUser(users: Users) {
        this.usersDoc = this.afs.doc(`users/${users.uid}`);
        console.log(this.usersDoc);
        
    }

    // deleteClient(client: Client) {
    //     this.clientDoc = this.afs.doc(`clients/${client.id}`);
    //     this.clientDoc.delete();
    // }
}
