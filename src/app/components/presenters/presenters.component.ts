import { Component, OnInit } from '@angular/core';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

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
  ) { }

  ngOnInit() {
    this.presenterService.getPresenters().subscribe(presenters => {
      this.presenters = presenters;
    });

    // Remove for production
    // this.admin = this.userservice.admin;
    this.admin = true;
  }

}
