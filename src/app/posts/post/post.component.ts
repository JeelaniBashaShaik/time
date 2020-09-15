import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from './../post';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private postDoc: AngularFirestoreDocument<any>;
  user;
  likeIcon = 'thumb-up-outline';
  @Input() currentPost;
  @Output() like = new EventEmitter();
  @Output() comment = new EventEmitter();

  likedBy = '';
  postComment = '';
  commentsSectionOpened = false;
  constructor(private afs: AngularFirestore,  private toastService: MzToastService) {}

  ngOnInit() {
    let likes = '';
    this.user = JSON.parse(localStorage.getItem('timeUser'));
    if (this.user !== null && this.user !== undefined && 'displayName' in this.user) {
    if (this.currentPost.likes['likedBy'].length) {
      this.currentPost.likes['likedBy'].map(name => {
        if (name === this.user.displayName) {
          this.likeIcon = 'thumb-up';
        }
        likes = likes + name + '<br/>';
       });
       this.likedBy = likes;
    }
    this.postDoc = this.afs.doc<any>(`posts/${this.currentPost.id}`);
    }
  }

  addLike() {
    this.like.emit();
    if (this.currentPost.likes['likedBy'].includes(this.user.displayName)) {
      this.toastService.show('You already liked it', 3000, 'orange');
    } else {
    ++this.currentPost.likes['count'];
    this.currentPost.likes['likedBy'].push(this.user.displayName);
    this.postDoc.update(this.currentPost).then(data => {
      this.toastService.show('Glad you liked it', 3000, 'green');
    });
  }
  }

  sendComment() {
    const currentComment = {
      comment: this.postComment,
      commentedBy: this.user.displayName,
      commentedTimestamp: (new Date()).toString()
    };
    this.currentPost.comments.unshift(currentComment);
    this.postDoc.update(this.currentPost).then(data => {
      this.toastService.show('Commented Successfully', 3000, 'green');
    });
  }

  share(post) {
    console.log(post);
    if (navigator['share'] !== undefined) {

      // Get the canonical URL from the link tag
      const shareUrl = 'www.abc.com';
  
      // Share it!
      navigator['share']({
        title: document.title,
        url: shareUrl
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));

    } else {
      console.log("Unfortunately, this feature is not supported on your browser");
    }
  }
}
