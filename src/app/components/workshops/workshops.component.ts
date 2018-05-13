import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';;
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/take'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {
  workshops: Workshop[];
  workshop: Workshop;
  admin: boolean;

  constructor(
    private wss: WorkshopsService,
    private icon: MatIconModule,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private auth: AuthService,
    private userService: UserService,
  ) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
  }

  ngOnInit() {
    this.wss.getWorkshops().subscribe(workshops => {
      this.workshops = workshops;
    });

    this.auth.user.take(1).subscribe(user => {
      if (user != null) {
        this.admin = user.admin;
        if (this.admin) {
          this.userService.setAdmin();
        }
      }
    });
  }
}
