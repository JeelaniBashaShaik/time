import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-posts-landing',
  templateUrl: './posts-landing.component.html',
  styleUrls: ['./posts-landing.component.css']
})
export class PostsLandingComponent implements OnInit {

  user;
  contactNumber;
  private postsCollection: AngularFirestoreCollection<any>;
  private usersDoc: AngularFirestoreDocument<any>;

  posts: Observable<any[]>;
  constructor(private db: AngularFirestore, private toastService: MzToastService) {
    // this.postsCollection = db.collection<any>('posts');
    this.postsCollection = this.db.collection('posts', ref => ref.orderBy('postedOn', 'desc'));
    // this.posts = this.postsCollection.valueChanges();
    this.posts = this.postsCollection.snapshotChanges().pipe(
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

  catchPost(post) {
    this.postsCollection.add(post).then(data => {
        this.toastService.show('Posted Successfully', 2000, 'green');
    }).catch(error => {
      this.toastService.show('Failed to Post', 2000, 'Red');
    });
  }

}
