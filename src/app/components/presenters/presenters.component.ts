import { Component, OnInit } from '@angular/core';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';
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
  selector: 'app-presenters',
  templateUrl: './presenters.component.html',
  styleUrls: ['./presenters.component.css']
})
export class PresentersComponent implements OnInit {

  presenters: Presenter[];
  admin: boolean;

  constructor(
    private presenterService: PresenterService,
    private icon: MatIconModule,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private auth: AuthService,
    private userService: UserService,
  ) { 
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
  }

  ngOnInit() {
    this.presenterService.getPresenters().subscribe(presenters => {
      this.presenters = presenters;
    });

    this.auth.user.take(1).subscribe(user => {
      if (user != null) {
        this.admin = user.admin;
        if(this.admin) {
          this.userService.setAdmin();
        }
      }
    });    
  }

}
