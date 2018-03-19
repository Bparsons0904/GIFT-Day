import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

@Component({
  selector: 'app-add-presenter',
  templateUrl: './add-presenter.component.html',
  styleUrls: ['./add-presenter.component.css']
})
export class AddPresenterComponent implements OnInit {

  presenter: Presenter = {
    name: '',
    occupation: '',
    bio: '',
    education: '',
    email: '',
    currentEmployer: '',
    imageURL: 'https://placeimg.com/300/240/people'
  }

  @ViewChild('presenterForm') form: any;

  constructor(
    private presenterService: PresenterService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Presenter, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.presenterService.newPresenter(value);
      this.flashMessage.show('New presenter added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/presenters']);
    }
  }
}
