import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

// User Profile Addins
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,

        // User Profile Addins
        private auth: AuthService
    ) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if(!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        });
    }

    // User Profile Addins
    // canActivateNew(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean> | boolean {

    //     return this.auth.user
    //         .take(1)
    //         .map(user => !!user)
    //         .do(loggedIn => {
    //             if (!loggedIn) {
    //                 console.log('access denied')
    //                 this.router.navigate(['/login']);
    //             }
    //         })

    // }
}