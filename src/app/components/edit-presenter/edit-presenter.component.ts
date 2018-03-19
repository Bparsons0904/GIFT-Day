import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

@Component({
  selector: 'app-edit-presenter',
  templateUrl: './edit-presenter.component.html',
  styleUrls: ['./edit-presenter.component.css']
})
export class EditPresenterComponent implements OnInit {

  id: string;
  presenter: Presenter = {
    name: '',
    occupation: '',
    bio: '',
    education: '',
    email: '',
    currentEmployer: '',
    imageURL: ''
  }

  constructor(
    private presenterService: PresenterService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.presenterService.getPresenter(this.id).subscribe(presenter => this.presenter = presenter);
  }

  onSubmit({ value, valid }: { value: Presenter, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly.', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      value.id = this.id;
      this.presenterService.updatePresenter(value);
      this.flashMessage.show('Presenter Updated.', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/presenters/'])
      // this.router.navigate(['/presenters/' + this.id])
    }
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.presenterService.deletePresenter(this.presenter);
      this.flashMessage.show('Presenter Removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/presenters']);
    }
  }
}
