import { Injectable } from '@angular/core';
import {
    AngularFirestore, AngularFirestoreCollection,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class UserService {
    usersCollection: AngularFirestoreCollection<User>;
    userDoc: AngularFirestoreDocument<User>;
    users: Observable<User[]>;
    user: Observable<User>;
    completeProfile: boolean = false;

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

    getUser(id: string): Observable<User> {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        this.user = this.userDoc.snapshotChanges().map(action => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as User;
                data.id = action.payload.id;
                return data;
            }
        });
        console.log(this.user);
        
        return this.user;
    }

    updateUsers(user: User) {
        this.userDoc = this.afs.doc(`users/${user.uid}`);
        this.userDoc.update(user);
    }

    // validUser(users: Users) {
    //     this.usersDoc = this.afs.doc(`users/${users.uid}`);
    //     console.log(this.usersDoc);
        
    // }




    // deleteClient(client: Client) {
    //     this.clientDoc = this.afs.doc(`clients/${client.id}`);
    //     this.clientDoc.delete();
    // }
}
