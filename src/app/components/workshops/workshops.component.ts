import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {
  workshops: Workshop[];
  admin: boolean;

  constructor(
    private wss: WorkshopsService,
    private userservice: UserService
  ) { }

  ngOnInit() {
    this.wss.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
    });

    // Remove for production
    // this.admin = this.userservice.admin;
    this.admin = true;
  }

}
