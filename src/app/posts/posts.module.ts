import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsLandingComponent } from './posts-landing/posts-landing.component';
import { PostComponent } from './post/post.component';
import { PostPipe } from './pos.pipe';
import { PostsRoutingModule } from './posts-routing.module';
import { MzIconMdiModule, MzTooltipModule, MzButtonModule,
  MzCollapsibleModule, MzInputModule, MzTextareaModule, MzToastModule, MzModalModule   } from 'ngx-materialize';
import { NewPostComponent } from './new-post/new-post.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [PostsLandingComponent, PostPipe, PostComponent, NewPostComponent],
  imports: [
    PostsRoutingModule, FormsModule,
    CommonModule, MzTooltipModule, MzIconMdiModule, MzTextareaModule,
      MzButtonModule, MzCollapsibleModule,
    MzInputModule, MzToastModule, ScrollDispatchModule,
    AngularFirestoreModule.enablePersistence(), MzModalModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ]
})
export class PostsModule { }
