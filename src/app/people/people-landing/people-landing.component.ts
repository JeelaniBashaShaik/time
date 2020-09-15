import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-people-landing',
  templateUrl: './people-landing.component.html',
  styleUrls: ['./people-landing.component.css']
})
export class PeopleLandingComponent implements OnInit {

  user;
  contactNumber;
  private usersCollection: AngularFirestoreCollection<any>;
  private usersDoc: AngularFirestoreDocument<any>;
  users: Observable<any[]>;

  constructor(private db: AngularFirestore, private toastService: MzToastService) {
    // this.postsCollection = db.collection<any>('posts');
    this.usersCollection = this.db.collection('users', ref => ref.orderBy('displayName', 'desc'));
    // this.posts = this.postsCollection.valueChanges();
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
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

}
