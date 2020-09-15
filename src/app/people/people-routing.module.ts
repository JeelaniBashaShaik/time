import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleLandingComponent } from './people-landing/people-landing.component';
import { AuthGuard } from './../auth.guard';
const routes: Routes = [
  { path: '', component: PeopleLandingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
