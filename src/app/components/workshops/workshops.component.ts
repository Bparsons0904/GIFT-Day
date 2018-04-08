import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';;
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {
  workshops: Workshop[];
  workshop: Workshop;
  admin: boolean;
  tab: boolean;

  constructor(
    private wss: WorkshopsService,
    private icon: MatIconModule,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
  }

  ngOnInit() {
    this.wss.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
    });
    // this.tab = true;
    // if (window.innerWidth < 992 && window.innerWidth > 577) { // 768px portrait
    //   this.tab = true;
    // } else {
    //   this.tab = false
    // }

    // Remove for production
    // this.admin = this.userservice.admin;
    this.admin = false;
  }

  // getSessionClasses(id, session) {
  //   console.log(id, session);
  //   return "sessions col"
  //   this.wss.getWorkshop(id).subscribe(workshop => {
  //     this.workshop = workshop;
  //     if (((workshop[session].totalSeats) / (workshop[session].totalSeats - workshop[session].registered.length)) < 0.25) {
  //       return "session col session-low"
  //     } else if (((workshop[session].totalSeats) / (workshop[session].totalSeats - workshop[session].registered.length)) == 0) {
  //       return "session col session-unavailable"
  //     } else {
  //       return "session col session-high"
  //     }
  //   });
  // }

}
