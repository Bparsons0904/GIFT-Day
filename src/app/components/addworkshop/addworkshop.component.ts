import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

@Component({
  selector: 'app-addworkshop',
  templateUrl: './addworkshop.component.html',
  styleUrls: ['./addworkshop.component.css']
})
export class AddworkshopComponent implements OnInit {

  workshop: Workshop = {
    name: '',
    imageURL: 'https://placeimg.com/300/240/tech',
    presenter1: '',
    presenter2: '',
    description: '',
    room: '',
    session1: {
      available: false,
      totalSeats: 0,
      // availableSeats: 0,
      registered: [],
    },
    session2: {
      available: false,
      totalSeats: 0,
      // availableSeats: 0,
      registered: [],
    },
    session3: {
      available: false,
      totalSeats: 0,
      // availableSeats: 0,
      registered: [],
    }
  }

  presenters: Presenter[];
  // secondPresenter: false;
  // session1Check: false;
  // session2Check: false;
  // session3Check: false;

  @ViewChild('workshopForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private wss: WorkshopsService,
    private router: Router,
    private presenterService: PresenterService,
  ) { }

  ngOnInit() {
    this.presenterService.getPresenters().subscribe(presenters => {
      this.presenters = presenters;
    });
  }

  onSubmit({ value, valid }: { value: Workshop, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      if (this.workshop.session1.totalSeats > 0) {
        this.workshop.session1.available = true;
        // this.workshop.session1.availableSeats = this.workshop.session1.totalSeats;
      };
      if (this.workshop.session2.totalSeats > 0) {
        this.workshop.session2.available = true;
        // this.workshop.session2.availableSeats = this.workshop.session2.totalSeats;
      };
      if (this.workshop.session3.totalSeats > 0) {
        this.workshop.session3.available = true;
        // this.workshop.session3.availableSeats = this.workshop.session3.totalSeats;
      };
      this.wss.newWorkshop(this.workshop);
      this.flashMessage.show('New workshop added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/workshops']);
    }
  }
}
