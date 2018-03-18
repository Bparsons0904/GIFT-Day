import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';

@Component({
  selector: 'app-editworkshop',
  templateUrl: './editworkshop.component.html',
  styleUrls: ['./editworkshop.component.css']
})
export class EditworkshopComponent implements OnInit {

  id: string;
  workshop: Workshop = {
    name: '',
    presenter: '',
    description: '',
    room: '',
    totalSeats: 0,
    availableSeats: 0,
    imageURL: ''
  }

  constructor(
    private wss: WorkshopsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => this.workshop = workshop);
  }

  onSubmit({ value, valid }: { value: Workshop, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      this.wss.updateWorkshop(value);
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
