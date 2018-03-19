import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PresenterService } from '../../services/presenter.service';
import { Presenter } from '../../models/presenter';

@Component({
  selector: 'app-details-presenter',
  templateUrl: './details-presenter.component.html',
  styleUrls: ['./details-presenter.component.css']
})
export class DetailsPresenterComponent implements OnInit {

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
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.presenterService.getPresenter(this.id).subscribe(presenter => this.presenter = presenter);
  }

}
