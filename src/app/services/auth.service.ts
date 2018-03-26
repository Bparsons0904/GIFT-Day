import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//User Profile Addin
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap'

import { NotifyService } from './notify.service';
import { switchMap } from 'rxjs/operators';

import { FlashMessagesService } from 'angular2-flash-messages';

import { User } from '../models/user';

// User Profile Addin
// interface User {
//   uid: string;
//   email: string;
//   grade?: string;
//   displayName?: string;
//   school?: string;
//   photoURL?: string;
// }

@Injectable()
export class AuthService {
  // User Profile Addin
  user: Observable<User>;
  uid: string;
  test: string;
  authState; any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
    private flashMessage: FlashMessagesService
  ) { 
    // User Profile Addin
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      });

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  // login(email: string, password: string) {
  //   return new Promise(( resolve, reject) => {
  //     this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData), err=> reject(err))
  //   });
  // }

  // register(email: string, password: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(userData => resolve(userData), err => reject(err))
  //   });
  // }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  getAuthID() {
    return this.authState.uid
    // return this.afAuth.auth;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // User Profile Addins
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }
  
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  phoneLogin() {
    const provider = new firebase.auth.PhoneAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error));
  }


  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
      // .catch((error) => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success')
        return this.updateUserData(user); // if using firestore
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
      // .catch((error) => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  setId(uid: string) {
    this.uid = uid
  }

  getId() {
    return this.uid
  }
  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    this.setId(user.uid);
   
    if (user.displayName != null) {
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName,
        workshops: [],
      };
      return userRef.set(data, { merge: true });
    } else {
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        workshops: [],
      };
      return userRef.set(data, { merge: true });
    } 
  }
}
