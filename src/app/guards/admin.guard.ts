import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

// User Profile Addins
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'
import 'rxjs/add/operator/take';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AdminGuard implements CanActivate {

    admin: boolean;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private flashMessage: FlashMessagesService,
        // User Profile Addins
        private auth: AuthService
    ) { }

    canActivate() {
        this.auth.user.take(1).subscribe(user => {
            this.admin = user.admin;
        });
        if(this.admin){
            return true;
        } else {
            this.flashMessage.show('Must be an Admin to access requested page.', {
                cssClass: 'alert-danger', timeout: 5000
            });
            this.router.navigate(['/']);
            return false;
        }

    }
}