import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
   
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

  constructor(
    private wss: WorkshopsService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => this.workshop = workshop)
    this.uid = "test1"
    // this.uid = this.auth.getId();

    if(this.workshop.registered.includes(this.id)) {
      console.log("True");
      
    } else {
      console.log("False");
      
    }
    // console.log(this.workshop.registered);
  }

  // ngAfterViewInit() {
  //   console.log(this.workshop.registered);
  // }

  workshopRegister() {
    this.workshop.registered.push(this.uid); 
    this.workshop.availableSeats -= 1;
    this.wss.updateWorkshop(this.workshop);
    console.log(this.workshop.registered);
    
  }
}
