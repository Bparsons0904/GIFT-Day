import { Component, OnInit } from '@angular/core';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';

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
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) { 
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/mdi.svg'));
  }

  ngOnInit() {
    this.presenterService.getPresenters().subscribe(presenters => {
      this.presenters = presenters;
    });

    // Remove for production
    // this.admin = this.userservice.admin;
    this.admin = true;
  }

}
