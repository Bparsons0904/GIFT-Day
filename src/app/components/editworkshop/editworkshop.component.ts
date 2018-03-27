import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

@Component({
  selector: 'app-editworkshop',
  templateUrl: './editworkshop.component.html',
  styleUrls: ['./editworkshop.component.css']
})
export class EditworkshopComponent implements OnInit {

  id: string;
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
      registered: [],
    },
    session2: {
      available: false,
      totalSeats: 0,
      registered: [],
    },
    session3: {
      available: false,
      totalSeats: 0,
      registered: [],
    }
  }

  presenters: Presenter[];

  constructor(
    private wss: WorkshopsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private presenterService: PresenterService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => this.workshop = workshop);

    this.presenterService.getPresenters().subscribe(presenters => {
      this.presenters = presenters;
    });
    
  }

  onSubmit({ value, valid }: { value: Workshop, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      for (let i = 1; i < 4; i++) {
        console.log("session" + i);
        
        console.log(this.workshop["session" + i].totalSeats);
        
        if (this.workshop["session" + i].totalSeats > 0) {
          this.workshop["session" + i].available = true;
        } else {
          this.workshop["session" + i].available = false;
        }
      }
      this.wss.updateWorkshop(this.workshop);
      this.flashMessage.show('Workshop Updated.', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/workshops/'])
      // this.router.navigate(['/workshops/' + this.id])
    }
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.wss.deleteWorkshop(this.workshop);
      this.flashMessage.show('Workshop Removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/workshops']);
    }
  }
}
