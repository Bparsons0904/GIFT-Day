import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WorkshopsService } from '../../services/workshops.service';
import { Workshop } from '../../models/Workshops';

@Component({
  selector: 'app-details-workshop',
  templateUrl: './details-workshop.component.html',
  styleUrls: ['./details-workshop.component.css']
})
export class DetailsWorkshopComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.wss.getWorkshop(this.id).subscribe(workshop => this.workshop = workshop);
  }

}
