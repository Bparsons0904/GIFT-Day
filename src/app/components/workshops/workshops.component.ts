import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';;

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {
  workshops: Workshop[];
  
  admin: boolean;
  tab: boolean;

  constructor(
    private wss: WorkshopsService,
  ) { }

  ngOnInit() {
    this.wss.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
    });
    this.tab = true;
    // if (window.innerWidth < 992 && window.innerWidth > 577) { // 768px portrait
    //   this.tab = true;
    // } else {
    //   this.tab = false
    // }

    // Remove for production
    // this.admin = this.userservice.admin;
    this.admin = true;
  }

}
