import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: Observable<Users>;
  
  constructor(
    public auth: AuthService,
    private flashMessage: FlashMessagesService,
    private afs: AngularFirestore,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.validUser;
    
  }

  onSubmit({ value, valid }: { value: Users, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.usersService.updateUsers(value);
      this.flashMessage.show('User Profile Updated.', {
        cssClass: 'alert-success', timeout: 4000
      });
      // this.router.navigate(['/client/' + this.id])
    }
  }

  idcheck() {
    this.usersService.validUser
  }

}
