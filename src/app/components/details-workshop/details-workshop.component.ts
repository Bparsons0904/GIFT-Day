import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';   
import { User } from '../../models/User';
import { Observable } from '@firebase/util';
import { Presenter } from '../../models/Presenter';
import { PresenterService } from '../../services/presenter.service';
import { AsyncPipe } from '@angular/common';

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
  registered1: boolean;
  registered2: boolean;
  registered3: boolean;
  registeredSession: string;
  // registeredPosition: number;
  userRegisteredPosition: number;
  user: User;
  presenter1: Presenter;
  presenter2: Presenter;

  constructor(
    private wss: WorkshopsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
    private presenterService: PresenterService,
  ) { }

  ngOnInit() {
    this.registered = false;
    // this.uid = this.auth.getAuthID();
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => {
      this.workshop = workshop;
      
      this.auth.user.subscribe(user => {
        this.uid = user.uid;
        this.userService.getUser(this.uid).subscribe(user => {
          this.user = user;
        });
        if (this.workshop.session1.registered.indexOf   (this.uid) > -1) {
          this.registered1 = true;
          this.registered = true;
          this.registeredSession = '1';
          // this.registered1Position = this.workshop.session1.registered.indexOf(this.uid)
        // console.log(this.registered1, this.registered1Position);

        } else {
          this.registered1 = false;
        };

        if (this.workshop.session2.registered.indexOf   (this.uid) > -1) {
          this.registered2 = true;
          this.registered = true;
          this.registeredSession = '2';
        // console.log(this.registered1, this.registered1Position);

        } else {
          this.registered2 = false;
        };
        if (this.workshop.session3.registered.indexOf   (this.uid) > -1) {
          this.registered3 = true;
          this.registered = true;
          this.registeredSession = '3';
        // console.log(this.registered1, this.registered1Position);

        } else {
          this.registered3 = false;
        };
        // if(this.registeredSession != null) {
        //   this.registered = true;
        // }
      
      });

      this.presenterService.getPresenter(this.workshop.presenter1).subscribe(presenter => this.presenter1 = presenter);
      this.presenterService.getPresenter(this.workshop.presenter2).subscribe(presenter => this.presenter2 = presenter);
    
      
      
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

  workshopRegister(sessionNumber) {
    this.workshop['session' + sessionNumber].registered.push(this.uid);
    // this.workshop.session1.availableSeats -= 1;
    this.wss.updateWorkshop(this.workshop);
    this['registered' + sessionNumber] = true;
    this.registeredSession = sessionNumber;
    this.registered = true;
    this.user.workshops.push(this.id);
    this.userService.addUserRegistration(this.user);
  }

  deleteRegistration() {
    this.workshop['session' + this.registeredSession].registered.splice(this.workshop['session' + this.registeredSession].registered.indexOf(this.uid), 1)
    // this.workshop['session' + this.registeredSession].availableSeats += 1;
    this.registered = false;
    this.registeredSession = null;
    this.registered1 = false;
    this.wss.updateWorkshop(this.workshop);
    this.user.workshops.splice(this.user.workshops.indexOf(this.id), 1);
    console.log(this.registered);
    
    this.userService.removeUserRegistration(this.user);
    // console.log(this.workshop['session' + this.registeredSession].registered, this.user.workshops, this.registered);
  }

  status() {
    console.log(this.registered);
    
  }
}
