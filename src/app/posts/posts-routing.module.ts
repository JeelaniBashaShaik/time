import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsLandingComponent } from './posts-landing/posts-landing.component';
import { AuthGuard } from './../auth.guard';
const routes: Routes = [
  { path: '', component: PostsLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
