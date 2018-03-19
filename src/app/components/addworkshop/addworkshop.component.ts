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
    presenter: {
      id: '',
      name: '',
    },
    description: '',
    room: '',
    totalSeats: 0,
    availableSeats: 0,
    imageURL: 'https://placeimg.com/300/240/tech'
  }

  presenters: Presenter[];

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
      value.availableSeats = value.totalSeats;
      this.wss.newWorkshop(value);
      this.flashMessage.show('New workshop added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/workshops']);
    }
  }
}
