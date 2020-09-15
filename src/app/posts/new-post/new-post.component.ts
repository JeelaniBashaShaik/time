import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: any;
  newPost = '';
  imageProgress = false;
  @Output() postIt = new EventEmitter();
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private toastService: MzToastService) { }

  ngOnInit() {
  }

  sendPost () {
    const user = JSON.parse(localStorage.getItem('timeUser'));
    const post = {
      postType: 'textPost',
      postText: this.newPost,
      postedOn: new Date(),
      likes: { count: 0, likedBy: []},
      comments: [],
      postedBy: user.displayName,
      photoUrl: user.photoURL,
      uid: user.uid
    };
    this.postIt.emit(post);
    this.newPost = '';
  }

  uploadFile(event, type) {
    
    const file = event.target.files[0];
    const  size  = file.size / 1048576;
    if (size < 3) {
      const randomId = Math.random().toString(36).substring(2);
    // const filePath = 'images/' + randomId;
    const filePath = `${type}/${randomId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL().subscribe(data => {
          this.imageProgress = false;
          const user = JSON.parse(localStorage.getItem('timeUser'));
          const post = {
            postType: type === 'image' ? 'imagePost' : 'videoPost',
            postImageUrl: data,
            postedOn: new Date(),
            likes: { count: 0, likedBy: []},
            comments: [],
            postedBy: user.displayName,
            photoUrl: user.photoURL,
            uid: user.uid
          };
          this.postIt.emit(post);
          this.newPost = '';
        }) )
     )
    .subscribe();
    } else {
      this.toastService.show('Cannot upload files greater than 3 MB', 3000, 'orange');
    }
    
  }

}
