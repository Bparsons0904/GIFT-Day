import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-presenters',
  templateUrl: './presenters.component.html',
  styleUrls: ['./presenters.component.css']
})
export class PresentersComponent implements OnInit {

  items: Observable<any[]>;

  constructor(db: AngularFirestore) { 
    this.items = db.collection('Presenters').valueChanges();
  }

  ngOnInit() {
  }

}

