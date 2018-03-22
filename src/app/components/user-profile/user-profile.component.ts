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

// import { ClientService } from '../../services/client.service';
// import { AngularFireAuth } from "angularfire2/auth";
// import { Client } from '../../models/Client';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: string;
  user: User;
  // client: Client;
  userID: string;
  workshops: Workshop[];
  registeredWorkshop: any[];
  test: Observable<User>;
  uid: string;

  
  constructor(
    public auth: AuthService,
    private flashMessage: FlashMessagesService,
    // private afs: AngularFirestore,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private wss: WorkshopsService,
    // private clientService: ClientService,
    // private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.wss.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
      this.auth.user.subscribe(user => {
        this.uid = user.uid;
        this.userService.getUser(this.uid).subscribe(user => {
          this.user = user;
        });


    });
    
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      if(value.workshops == null) {
        value.workshops = [];
      }
      
      this.userService.updateUsers(value);
      this.flashMessage.show('User Profile Updated.', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/'])
    }
  }

  idcheck() {
    this.test = this.auth.getAuthID(); 
    console.log(this.auth.getAuthID());
    
  }
  
}
