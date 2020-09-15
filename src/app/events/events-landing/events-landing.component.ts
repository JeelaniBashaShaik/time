import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MzToastService } from 'ngx-materialize';
import * as moment from 'moment';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrls: ['./events-landing.component.css']
})
export class EventsLandingComponent implements OnInit {

  isdisabled = false;
  user;
  private eventsCollection: AngularFirestoreCollection<any>;
  private usersDoc: AngularFirestoreDocument<any>;
  newEvent = {
    title: '',
    date: '',
    time: '',
    location: '',
    eventType: ''
  };
  events: Observable<any[]>;
  public options: Pickadate.DateOptions = {
    // format: 'dddd, dd mmm, yyyy'
    format: 'dd/mm/yyyy'
  };
  constructor(private db: AngularFirestore, private toastService: MzToastService) {
    this.eventsCollection = this.db.collection('events');
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        data['daysLeft'] = this.pickDate(data['date']);
        return { id, ...data };
      }))
    );
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('timeUser'));
    if (this.user !== null && 'uid' in this.user) {
      this.usersDoc = this.db.doc<any>(`users/${this.user.uid}`);
    }
  }

  pickDate(date: string) {
    const inputDate = date.split('/');
    const count = this.daysLeft(inputDate[2], inputDate[1], inputDate[0]);
    return count;
  }

  daysLeft(futureYear, futureMonth, futureDay) {
    const today = new Date();
    const a = moment(`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`, 'DD/MM/YYYY');
    const b = moment(`${futureDay}/${futureMonth}/${futureYear}`, 'DD/MM/YYYY');
    const days = b.diff(a, 'days');
    return days;
  }

  catchEvent() {
    this.isdisabled = true;
    this.eventsCollection.add(this.newEvent).then(data => {
      this.toastService.show('Event Created Successfully', 2000, 'green');
      this.newEvent = {
        title: '',
        eventType: '',
        date: '',
        time: '',
        location: ''
      };
      this.isdisabled = false;
  }).catch(error => {
    this.toastService.show('Failed to Create Event', 2000, 'Red');
  });
  }


}
