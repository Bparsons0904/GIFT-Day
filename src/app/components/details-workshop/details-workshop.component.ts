import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';   
import { User } from '../../models/User';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-details-workshop',
  templateUrl: './details-workshop.component.html',
  styleUrls: ['./details-workshop.component.css']
})
export class DetailsWorkshopComponent implements OnInit {

  id: string;
  workshop: Workshop;
  uid: string;
  registered: boolean;
  registeredPosition: number;
  userRegisteredPosition: number;
  user: User;

  constructor(
    private wss: WorkshopsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    // this.uid = this.auth.getAuthID();
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => {
      this.workshop = workshop;
      
    this.auth.user.subscribe(user => {
      this.uid = user.uid;
      this.userService.getUser(this.uid).subscribe(user => {
        this.user = user;
      });
      if (this.workshop.registered.indexOf(this.uid) > -1) {
        this.registered = true;
        this.registeredPosition = this.workshop.registered.indexOf(this.uid)
        console.log(this.registered, this.registeredPosition);

      } else {
        this.registered = false;
      }
      
    });

    
      
      
      // if(this.uid == undefined) {
      //   this.auth.user.subscribe(user => {
      //     this.uid = user.uid;
      //     console.log(this.uid);
          
      //     this.userService.getUser(this.uid).subscribe(user => {
      //       this.user = user;
      //     });

      //   });
      // }

      // console.log(this.workshop.registered.indexOf(this.uid), this.uid, this.id);

      
      
    });

    // if(this.workshop.registered.includes(this.id)) {
    //   console.log("True");
      
    // } else {
    //   console.log("False");
      
    // }
    // console.log(this.workshop.registered);
  }

  // ngAfterViewInit() {
  //   console.log(this.workshop.registered);
  // }

  workshopRegister() {
    this.workshop.registered.push(this.uid); 
    this.workshop.availableSeats -= 1;
    this.wss.updateWorkshop(this.workshop);
    this.registeredPosition = this.workshop.registered.indexOf(this.uid);
    this.registered = true;
    this.user.workshops.push(this.id);
    this.userService.addUserRegistration(this.user);
  }

  deleteRegistration() {
    this.workshop.registered.splice(this.registeredPosition, 1)
    this.workshop.availableSeats += 1;
    this.registeredPosition = null;
    this.registered = false;
    this.wss.updateWorkshop(this.workshop);
    this.user.workshops.splice(this.user.workshops.indexOf(this.id), 1);
    console.log(this.user.workshops);
    
    this.userService.removeUserRegistration(this.user);
    console.log(this.workshop.registered, this.user.workshops);
  }
}
