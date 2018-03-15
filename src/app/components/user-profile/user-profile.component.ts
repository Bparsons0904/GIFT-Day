import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {
  AngularFirestore, AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: User;
  client: Client;
  userID: string;



  
  constructor(
    public auth: AuthService,
    private flashMessage: FlashMessagesService,
    private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.userService.updateUsers(value);
      this.flashMessage.show('User Profile Updated.', {
        cssClass: 'alert-success', timeout: 4000
      });
      // this.router.navigate(['/client/' + this.id])
    }
  }

  idcheck(uid: string) {
    // this.userService.getUser(uid).subscribe(user => {
    //   this.user = user
    //   console.log(this.user.displayName);
      
    // });
    
  }
  
}
